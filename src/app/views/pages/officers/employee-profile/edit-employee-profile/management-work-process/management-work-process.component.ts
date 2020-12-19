import { error } from '@angular/compiler-cli/src/transformers/util';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotiService } from './../../../../../../core/service/service-model/notification.service';
import { EmployeeProfileModel } from './../../../../../../core/service/model/Employee-profile';
import { NgUnsubscribe } from './../../../../../shared/directives/ng-unsubscribe.directive';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';
import { EmployeeWorkingHistory } from 'src/app/core/service/model/employee-working-history';
import { BehaviorSubject } from 'rxjs';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { EmployeeWorkHistoryService } from 'src/app/core/service/service-model/employee-working-history-service';
import { ModalDeleteEmployeeWorkComponent } from './modal-delete-employee-work/modal-delete-employee-work.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MustMatch } from 'src/app/core/_helpers/must-match.validator';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/core/service/service-model/employee.service';
import { locale } from 'src/app/core/_config/i18n/vi';

@Component({
  selector: 'kt-management-work-process',
  templateUrl: './management-work-process.component.html',
  styleUrls: ['./management-work-process.component.scss'],
})
export class ManagementWorkProcessComponent extends NgUnsubscribe implements OnInit {
  @ViewChild("organization") organization: ElementRef;
  @ViewChild("department") department: ElementRef;
  @ViewChild("position") position: ElementRef;
  @ViewChild("jobDetail") jobDetail: ElementRef;
  employee: EmployeeProfileModel;
  nameEmp: string;
  VI_LANG = locale.data;
  mySelection: string[] = [];
  constructor(private employeeWorkHistoryService: EmployeeWorkHistoryService,
    private notiService: NotiService,
    private modal: NgbModal,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private employeeService: EmployeeService) {
    super();
  }
  gridData: GridDataResult;
  stateGrid: State = {
    skip: 0,
    take: 10,
  };
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public _pageSize = 5;
  public pageSizes: Array<number> = [10, 20];
  items: EmployeeWorkingHistory[];
  checkDeleteAll = true;
  opened = false;
  public formGroup: FormGroup;
  private editedRowIndex: number;
  maxDate = new Date();
  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee() {
    this.loading$.next(true);
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.employeeService.getEmployeeByID(params['id']).subscribe(data => {
          if (data) {
            this.employee = data;
            this.nameEmp = data.fullName;
            this.loadItems();
          }
        }, () => this.loading$.next(false));
      }
    });
  }

  onChange(row: any) {
    this.mySelection = row;
    this.checkDeleteAll = this.mySelection.length === 0;
  }

  loadItems() {
    this.loading$.next(true);
    this.employeeWorkHistoryService.GetEmployeeWorking(this.employee.id, '', '', this.stateGrid.skip, this._pageSize).subscribe(data => {
      if (data) {
        this.gridData = ({
          data: data.items,
          total: data.totalCount
        });
      }
      this.isLoading$.next(true);
      this.loading$.next(false);
    }, () => {
      this.isLoading$.next(true);
      this.loading$.next(false);
    });
  }

  addNewItem() {
    const element: HTMLElement = document.getElementById('addBtn') as HTMLElement;
    element.click();
  }

  openModalDel() {
    const modalRef = this.modal.open(ModalDeleteEmployeeWorkComponent, { centered: true });
    modalRef.componentInstance.listIds = this.mySelection;
    modalRef.componentInstance.empID = this.employee.id;
    modalRef.result.then(result => {
      if (result === 'ok') {
        if (this.mySelection.length !== 1) this.stateGrid.skip = 0;
        this.mySelection = [];
        this.checkDeleteAll = true;
        this.loadItems();
      }
    }).catch(error => error);
  }

  close(item: string) {
    this.opened = false;
  }

  pageChange(event) {
    this.stateGrid.skip = event.skip;
    this.loadItems();
  }

  pageSizeChange() {
    this.stateGrid.skip = this._pageSize * Math.floor(this.stateGrid.skip / this._pageSize);
    this.loadItems();
  }

  public addHandler({ sender }) {
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      id: new FormControl(''),
      employeeId: new FormControl(this.employee.id),
      employeeName: new FormControl(this.employee.fullName),
      organization: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
      jobDetail: new FormControl('', [Validators.required]),
      fromDate: new FormControl('', Validators.required),
      toDate: new FormControl(''),
      envidenceFileUrl: new FormControl('', Validators.maxLength(50)),
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
      employeeId: new FormControl(dataItem.employeeId),
      employeeName: new FormControl(dataItem.employeeName),
      organization: new FormControl(dataItem.organization, [Validators.required]),
      department: new FormControl(dataItem.department, [Validators.required]),
      position: new FormControl(dataItem.position, [Validators.required]),
      jobDetail: new FormControl(dataItem.jobDetail, [Validators.required]),
      fromDate: new FormControl(new Date(dataItem.fromDate), Validators.required),
      toDate: new FormControl(setDate),
      envidenceFileUrl: new FormControl(dataItem.envidenceFileUrl, Validators.maxLength(50)),
    });

    this.editedRowIndex = rowIndex;
    sender.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    const empWork: EmployeeWorkingHistory = formGroup.value;
    if (this.validateForm(formGroup, empWork) === 'success') {
      this.loading$.next(true);
      empWork.fromDate = this.datePipe.transform(empWork.fromDate, 'yyyy/MM/dd');
      empWork.toDate = this.datePipe.transform(empWork.toDate, 'yyyy/MM/dd');
      if (empWork.id === null || !empWork.id) {
        this.employeeWorkHistoryService.CreatEmpWorking(this.employee.id, empWork).subscribe(data => {
          this.notiService.createSuccess();
          this.loadItems();
          sender.closeRow(rowIndex);
        }, () => this.loading$.next(false));
      } else {
        this.employeeWorkHistoryService.UpdateEmpWorking(this.employee.id, empWork).subscribe(data => {
          this.notiService.updateSuccess();
          this.loadItems();
          sender.closeRow(rowIndex);
        }, () => this.loading$.next(false));
      }
    }
  }

  validateForm(formGroup: FormGroup, empWork: EmployeeWorkingHistory) {
    if (formGroup.controls.organization.errors?.required) {
      this.notiService.showNoti('Cơ quan/Đơn vị không được để trống!', 'error');
    } else if (formGroup.controls.department.errors?.required) {
      this.notiService.showNoti('Phòng ban không được để trống!', 'error');
    } else if (formGroup.controls.position.errors?.required) {
      this.notiService.showNoti('Chức vụ không được để trống!', 'error');
    } else if (formGroup.controls.jobDetail.errors?.required) {
      this.notiService.showNoti('Công việc không được để trống!', 'error');
    } else if (this.formGroup.controls['organization'].value.length > 100) {
      this.notiService.showNoti('Cơ quan/Đơn vị tối đa 100 kí tự!', 'error');
      this.organization.nativeElement.focus();
    } else if (this.formGroup.controls['department'].value.length > 100) {
      this.notiService.showNoti('Phòng ban tối đa 100 kí tự!', 'error');
      this.department.nativeElement.focus();
    } else if (this.formGroup.controls['position'].value.length > 100) {
      this.notiService.showNoti('Chức vụ tối đa 100 kí tự!', 'error');
      this.position.nativeElement.focus();
    } else if (this.formGroup.controls['jobDetail'].value.length > 250) {
      this.notiService.showNoti('Công việc tối đa 250 kí tự!', 'error');
      this.jobDetail.nativeElement.focus();
    } else if (formGroup.controls.fromDate.errors?.required) {
      this.notiService.showNoti('Ngày bắt đầu không được để trống!', 'error');
    } else if (formGroup.controls.toDate.errors?.required) {
      this.notiService.showNoti('Ngày kết thúc không được để trống!', 'error');
    } else if (new Date(empWork.toDate).getTime() < new Date(empWork.fromDate).getTime() && empWork.toDate !== null) {
      this.notiService.showNoti('Ngày kết thúc không được nhỏ hơn ngày bắt đầu!', 'error');
    } else if (new Date(empWork.fromDate).getTime() > new Date().getTime()) {
      this.notiService.showNoti('Ngày bắt đầu không được lớn hơn ngày hiện tại!', 'error');
    } else {
      return 'success';
    }
  }
}

