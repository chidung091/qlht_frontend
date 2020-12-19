import { Category } from './../../../../../../core/category/_models/category.model';
import { CategoryService } from './../../../../../../core/category/_services/category.service';
import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';
import { EmployeeProfileModel } from 'src/app/core/service/model/Employee-profile';
import { NgUnsubscribe } from 'src/app/views/shared/directives/ng-unsubscribe.directive';
import { EmployeeTrainingService } from '../../../../../../core/service/service-model/employee-training.service';
import { EmployeeTraining } from '../../../../../../core/service/model/employee-training';
import { NotiService } from '../../../../../../core/service/service-model/notification.service';
import { BehaviorSubject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryType } from 'src/app/core/_constants';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { locale } from 'src/app/core/_config/i18n/vi';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/core/service/service-model/employee.service';

@Component({
  selector: 'kt-educate-information',
  templateUrl: './educate-information.component.html',
  styleUrls: ['./educate-information.component.scss'],
})
export class EducateInformationComponent extends NgUnsubscribe implements OnInit {
  @ViewChild("trainingPlace") trainingPlace: ElementRef;
  @ViewChild("description") description: ElementRef;
  employee: EmployeeProfileModel;
  nameEmp: string;
  VI_LANG = locale.data;
  mySelection: string[] = [];
  constructor(private employeeTrainingService: EmployeeTrainingService,
    private notiService: NotiService,
    private modalService: NgbModal,
    private categoryService: CategoryService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {
    super();
  }
  gridData: GridDataResult;
  stateGrid: State = {
    skip: 0,
    take: 10,
  };
  public loadData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public loadingDelete: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public _pageSize = 5;
  public pageSizes: Array<number> = [10, 20];
  xoa: any = [];
  listChuyenNganh: Category[];
  listHinhThuc: Category[];
  listChungChi: Category[];
  loadGrid: boolean;
  disableBtn = true;
  maxDate = new Date();
  public formGroup: FormGroup;
  private editedRowIndex: number;
  ngOnInit(): void {
    this.getEmployee();
    this.getTrinhDoChuyenMon();
    this.getHinhThucDaoTao();
    this.getNhomChuyenNganh();
  }

  getEmployee() {
    this.loadData.next(true);
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.employeeService.getEmployeeByID(params['id']).subscribe(data => {
          if (data) {
            this.employee = data;
            this.nameEmp = data.fullName;
            this.loadEmployeeTraining();
          }
        }, () => this.loadData.next(false));
      }
    });
  }

  loadEmployeeTraining() {
    this.loadData.next(true);
    this.employeeTrainingService.GetEmployeeTraining(this.employee.id, '', '', this.stateGrid.skip, this._pageSize).subscribe(data => {
      this.gridData = ({
        data: data.items,
        total: data.totalCount
      });
      this.loadData.next(false);
    }, () => {
      this.loadData.next(false);
      this.notiService.showNoti('Hệ thống bảo trì', 'error');
    })
    this.isLoading$.next(true);
  }

  onChange(row: any) {
    this.mySelection = row;
    this.disableBtn = this.mySelection.length === 0;
  }

  delete() {
    this.loadData.next(true);
    this.employeeTrainingService.DeleteEmployeeTraining(this.employee.id, this.mySelection).subscribe(() => {
      if (this.mySelection.length !== 1) this.stateGrid.skip = 0;
      this.notiService.showNoti('Xóa thành công', 'success');
      this.loadData.next(false);
      this.loadEmployeeTraining();
    }, () => {
      this.loadData.next(false);
      this.notiService.showNoti('Hệ thống gián đoạn', 'error');
    })
    // }
  }

  addNewItem() {
    const element: HTMLElement = document.getElementById('addBtn') as HTMLElement;
    element.click();
  }

  pageChange(event) {
    this.stateGrid.skip = event.skip;
    this.loadEmployeeTraining();
  }

  pageSizeChange() {
    this.stateGrid.skip = this._pageSize * Math.floor(this.stateGrid.skip / this._pageSize);
    this.loadEmployeeTraining();
  }

  openModalDelete(mymodal) {
    this.loadingDelete.next(false);
    this.modalService.open(mymodal, { windowClass: 'myCustomModalClass', centered: true });
    document.getElementById('focusDelete').focus();
  }

  public addHandler({ sender }) {
    this.closeEditor(sender);
    this.formGroup = new FormGroup({
      id: new FormControl(''),
      employeeId: new FormControl(this.employee.id),
      employeeName: new FormControl(this.employee.fullName),
      trainingPlace: new FormControl('', [Validators.required]),
      trainingFormCode: new FormControl('', Validators.required),
      trainingFormName: new FormControl(''),
      specializedCode: new FormControl('', Validators.required),
      specializedName: new FormControl(''),
      diplomaCode: new FormControl('', Validators.required),
      diplomaName: new FormControl(),
      fromDate: new FormControl('', Validators.required),
      toDate: new FormControl(''),
      description: new FormControl(''),
      envidenceFileUrl: new FormControl('', Validators.maxLength(50))
    });
    sender.addRow(this.formGroup);
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

  public editHandler({ sender, rowIndex, dataItem }) {
    let setDate: any;
    if (dataItem.toDate === null) setDate = null;
    else if (dataItem.toDate !== null) setDate = new Date(dataItem.toDate);
    this.closeEditor(sender);
    this.formGroup = new FormGroup({
      id: new FormControl(dataItem.id),
      employeeId: new FormControl(this.employee.id),
      employeeName: new FormControl(this.employee.fullName),
      trainingPlace: new FormControl(dataItem.trainingPlace, [Validators.required]),
      trainingFormCode: new FormControl(dataItem.trainingFormCode, Validators.required),
      trainingFormName: new FormControl(dataItem.trainingFormName),
      specializedCode: new FormControl(dataItem.specializedCode, Validators.required),
      specializedName: new FormControl(dataItem.specializedName),
      diplomaCode: new FormControl(dataItem.diplomaCode, Validators.required),
      diplomaName: new FormControl(dataItem.diplomaName),
      fromDate: new FormControl(new Date(dataItem.fromDate), Validators.required),
      toDate: new FormControl(setDate),
      description: new FormControl(dataItem.description),
      envidenceFileUrl: new FormControl(dataItem.envidenceFileUrl, Validators.maxLength(50))
    });

    this.editedRowIndex = rowIndex;
    sender.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }
  

  public saveHandler({ sender, rowIndex, formGroup }) {
    const empTrain: EmployeeTraining = formGroup.value;3
    if (this.validateForm(formGroup, empTrain) === 'success') {
      this.loadData.next(true);
      empTrain.trainingFormName = this.listChuyenNganh.filter(data => data.cateCode === empTrain.trainingFormCode)[0].cateName;
      empTrain.specializedName = this.listHinhThuc.filter(data => data.cateCode === empTrain.specializedCode)[0].cateName;
      empTrain.diplomaName = this.listChungChi.filter(data => data.cateCode === empTrain.diplomaCode)[0].cateName;
      empTrain.fromDate = this.datePipe.transform(empTrain.fromDate, 'yyyy/MM/dd');
      empTrain.toDate = this.datePipe.transform(empTrain.toDate, 'yyyy/MM/dd');
      if (empTrain.id === null || !empTrain.id) {
        this.employeeTrainingService.CreateEmployeeTraining(this.employee.id, empTrain).subscribe(() => {
          this.notiService.createSuccess();
          this.loadEmployeeTraining();
          sender.closeRow(rowIndex);
        }, () => this.loadData.next(false));
      } else {
        this.employeeTrainingService.UpdateEmployeeTraining(this.employee.id, empTrain).subscribe(() => {
          this.notiService.updateSuccess();
          this.loadEmployeeTraining();
          sender.closeRow(rowIndex);
        }, () => this.loadData.next(false));
      }
    }
  }

  getNhomChuyenNganh() {
    this.categoryService.getCateByCode(CategoryType.DM_NHOM_CHUYEN_NGANH).subscribe(data => {
      this.listChuyenNganh = data;
    });
  }

  getHinhThucDaoTao() {
    this.categoryService.getCateByCode(CategoryType.DM_HINH_THUC_DAO_TAO).subscribe(data => {
      this.listHinhThuc = data;
    });
  }

  getTrinhDoChuyenMon() {
    this.categoryService.getCateByCode(CategoryType.DM_TRINH_DO_CHUYEN_MON).subscribe(data => {
      this.listChungChi = data;
    });
  }

  validateForm(formGroup: FormGroup, empTrain: EmployeeTraining) {
    if (formGroup.controls.trainingPlace.errors?.required) {
      this.notiService.showNoti('Tên cơ sở không được để trống!', 'error');
    } else if (this.formGroup.controls['trainingPlace'].value.length > 100) {
      this.notiService.showNoti('Tên cơ sở tối đa 100 kí tự!', 'error');
      this.trainingPlace.nativeElement.focus();
    } else if (formGroup.controls.trainingFormCode.errors?.required) {
      this.notiService.showNoti('Chuyên ngành không được để trống!', 'error');
    } else if (formGroup.controls.specializedCode.errors?.required) {
      this.notiService.showNoti('Hình thức không được để trống!', 'error');
    } else if (formGroup.controls.diplomaCode.errors?.required) {
      this.notiService.showNoti('Chứng chỉ không được để trống!', 'error');
    } else if (this.formGroup.controls['description'].value.length > 250) {
      this.notiService.showNoti('Ghi chú tối đa 250 kí tự!', 'error');
      this.description.nativeElement.focus();
    } else if (formGroup.controls.fromDate.errors?.required) {
      this.notiService.showNoti('Ngày bắt đầu không được để trống!', 'error');
    } else if (formGroup.controls.toDate.errors?.required) {
      this.notiService.showNoti('Ngày kết thúc không được để trống!', 'error');
    } else if (new Date(empTrain.toDate).getTime() < new Date(empTrain.fromDate).getTime() && empTrain.toDate !== null) {
      this.notiService.showNoti('Ngày kết thúc không được nhỏ hơn ngày bắt đầu!', 'error');
    } else if (new Date(empTrain.fromDate).getTime() > new Date().getTime()) {
      this.notiService.showNoti('Ngày bắt đầu không được lớn hơn ngày hiện tại!', 'error');
    } else {
      return 'success';
    }
  }
}
