import {Component, Input, OnInit} from '@angular/core';
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {GridParam, SortDirection} from '../../../../../../core/service/model/grid-param';
import {BehaviorSubject, Observable} from 'rxjs';
import {CatalogService} from '../../../../../../core/service/service-model/catalog.service';
import {CatalogModel} from '../../../../../../core/service/model/catalog.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalDeleteEmployeeSalaryComponent} from './modal-delete-employee-salary/modal-delete-employee-salary.component';
import {Store as StoreRx,select} from '@ngrx/store';
import {AppState} from '../../../../../../core/reducers';
import {AllCategoriesRequested, Category, getCate, ListCateCode} from '../../../../../../core/category';
import {EmployeeSalaryService} from '../../../../../../core/employee/salary/salary-employee.service';
import { EmployeeProfileModel } from 'src/app/core/service/model/Employee-profile';
import { NgUnsubscribe } from 'src/app/views/shared/directives';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {EmployeeSalary} from '../../../../../../core/employee/salary/salary-employee.model';
import {NotiService} from '../../../../../../core/service/service-model/notification.service';
import {takeUntil} from 'rxjs/operators';
import {getAllPublicServant, GetAllPublicServantCategory} from '../../../../../../core/common';
import {PublicServantModel} from '../../../../../../core/common/model/public-servant.model';
import {ActivatedRoute} from '@angular/router';
import {EmployeeService} from '../../../../../../core/service/service-model/employee.service';

@Component({
  selector: 'kt-salary-information',
  templateUrl: './salary-information.component.html',
  styleUrls: ['./salary-information.component.scss']
})
export class SalaryInformationComponent extends NgUnsubscribe implements OnInit {
  employeeInp: EmployeeProfileModel;
  nameEmp: string;
  public inforFind: GridParam;
  private skip = 0;
  private _pageSize = 5;
  valueAdd = null;
  pageSizes: Array<number> = [5, 10, 20];
  editedRowIndex: number;
  formDataSalary: FormGroup;
  gridView: GridDataResult;
  employeeSalaryAllwanceId : string;
  public loadingDelete: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public buttonCount = 5;
  listEmployeeSalary = [];
  dataEmployeeSalary: GridDataResult;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  listIdsDel: string[] = [];
  checkDeleteAll = true;
  public loading = true;
  ngachHang$: Observable<PublicServantModel[]>;
  bacLuong$: Observable<Category[]>;
  checkSalaryLevel = false;
  checkCoefficient = false;
  checkAppliedDate = false;
  public min: Date = new Date(1900, 1, 1);
  public max: Date = new Date(9999, 12, 31);

  public loadingNgachHang$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loadingBacLuong$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  mySelection: any;
  default: {cateCode: string, cateName: string} = {cateCode: null, cateName: 'lựa chọn'};

  constructor(private employeeSalaryService: EmployeeSalaryService,
              private catalogService: CatalogService,
              public modal: NgbModal,
              private notiService: NotiService,
              private storeRx: StoreRx<AppState>,
              private datePipe: DatePipe,
              private route: ActivatedRoute,
              private employeeService:EmployeeService) {
                super();
  }

  ngOnInit(): void {
    this.ngachHang$ = this.storeRx.pipe(select(getAllPublicServant));
    this.bacLuong$ = this.storeRx.pipe(select(getCate, ListCateCode.dmBacLuong));
    this.loadDataApi();

    this.getEmployee();
  }

  getEmployee() {
    this.loading = true;
    this.route.params.subscribe(params => {
      if (params.id) {
        this.employeeService.getEmployeeByID(params.id).subscribe(data => {
          if (data) {
            this.employeeInp = data;
            this.nameEmp = data.fullName;
            this.loadData();
          }
        }, () => this.loading = false);
      }
    });
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formDataSalary = undefined;
  }

  loadDataApi(){
    this.ngachHang$.subscribe((data) => {
      if (!data) {
        this.loadingNgachHang$.next(true);
        this.storeRx.dispatch(new GetAllPublicServantCategory());
      } else {
        this.loadingNgachHang$.next(false);
      }
    })
    this.bacLuong$.subscribe((data) => {
      if (!data) {
        this.loadingBacLuong$.next(true);
        this.storeRx.dispatch(new AllCategoriesRequested({categoryCode: ListCateCode.dmBacLuong}));
      } else {
        this.loadingBacLuong$.next(false);
      }
    })
  }

  loadData() {
    this.disableButtonDelete();
    this.loading = true;
    const param = {};
    this.inforFind = new GridParam();
    this.inforFind.sort = 'creationTime';
    this.inforFind.sortDirection = SortDirection.DESC;
    this.inforFind.filterItems = [];
    this.inforFind.skipCount = this.skip;
    this.inforFind.maxResultCount = this._pageSize;
    param['param'] = this.inforFind;
    param['employeeId']= this.employeeInp.id;
    this.employeeSalaryService.GetEmployeeSalary(param).pipe(takeUntil(this.ngUnsubscribe)).subscribe(datax => {
      if (datax) {
        this.listEmployeeSalary = datax.items
        this.dataEmployeeSalary = ({
          data: datax.items,
          total: datax.totalCount
        });
      }
      this.isLoading$.next(true);
      this.loading = false;
    }, error => {
      this.loading = false
      this.isLoading$.next(true);
    })
  }

  onChange(row) {
      this.listIdsDel = row;
    this.disableButtonDelete();
  }

  disableButtonDelete() {
    if(this.listIdsDel.length < 1){
      this.checkDeleteAll = true;
    } else {
      this.checkDeleteAll = false;
    }
  }

  Delete(mymodal) {
    this.modal.open(mymodal, {windowClass: 'myCustomModalClass', centered: true});
    document.getElementById('focusDelete').focus();
  }
  deleteClassRoom(yes: string) {
    this.loadingDelete.next(true);
    this.employeeSalaryService.DeleteMultiple(this.listIdsDel).subscribe(() => {
      this.notiService.deleteSuccess();
      this.skip = 0;
      this.listIdsDel = [];
      this.checkDeleteAll = true;
      this.loadingDelete.next(false);
      this.modal.dismissAll();
      this.loadData();
    }, error => this.loadingDelete.next(false))
  }

  pageSizeChange() {
    this.skip = this._pageSize * Math.floor(this.skip / this._pageSize);
    this.loadData()
  }

  pageChange(event: PageChangeEvent) {
    this.skip = event.skip;
    this.loadData()
  }

  changeNgachHang() {
    if(this.formDataSalary.value.employeeScale){
      let e: PublicServantModel[];
      this.ngachHang$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(data=>{
        e = (data.filter(datas => datas.cateCode === this.formDataSalary.value.employeeScale));
      })
      this.formDataSalary.value.employeeScaleCode = e[0].rankCode;
    }
    this.checkSalaryLevel = false;
    this.checkCoefficient = false;
    this.checkAppliedDate = false;
  }

  addNewItem() {
    const element: HTMLElement = document.getElementById('addBtn') as HTMLElement;
    element.click();
  }

  addHandler({ sender }) {
    this.closeEditor(sender);
    this.valueAdd = null
    this.formDataSalary = new FormGroup({
      id: new FormControl(null),
      employeeId: new FormControl(this.employeeInp.id),
      salaryLevel: new FormControl('',[Validators.required]),
      employeeScale: new FormControl(''),
      employeeScaleCode: new FormControl(''),
      coefficient: new FormControl('',[Validators.required,Validators.maxLength(5),Validators.pattern('^((\\.0{1,2})?|[1-9]?\\d(\\.\\d{1,2})?)$')]),
      seniorityAllowance: new FormControl('',[Validators.maxLength(5),Validators.pattern('^(100(\\.0{1,2})?|[1-9]?\\d(\\.\\d{1,2})?)$')]),
      vocationalAllowance: new FormControl('',[Validators.maxLength(5),Validators.pattern('^(100(\\.0{1,2})?|[1-9]?\\d(\\.\\d{1,2})?)$')]),
      preferentialAllowance: new FormControl('',[Validators.maxLength(5),Validators.pattern('^(100(\\.0{1,2})?|[1-9]?\\d(\\.\\d{1,2})?)$')]),
      prefrentialAllowLeadership: new FormControl('',[Validators.maxLength(5),Validators.pattern('^(100(\\.0{1,2})?|[1-9]?\\d(\\.\\d{1,2})?)$')]),
      salaryAmount: new FormControl('',[Validators.maxLength(5),Validators.pattern('^(100(\\.0{1,2})?|[1-9]?\\d(\\.\\d{1,2})?)$')]),
      appliedDate: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.maxLength(250)])
    });
    sender.addRow(this.formDataSalary);
  }

  editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);
    this.employeeSalaryAllwanceId = dataItem.employeeSalaryAllwanceId;
    this.formDataSalary = new FormGroup({
      id: new FormControl(dataItem.id),
      employeeId: new FormControl(dataItem.employeeId),
      salaryLevel: new FormControl(dataItem.salaryLevel,[Validators.required]),
      employeeScale: new FormControl(dataItem.employeeScale),
      employeeScaleCode: new FormControl(dataItem.employeeScaleCode),
      coefficient: new FormControl(dataItem.coefficient,[Validators.required,Validators.maxLength(5),Validators.pattern('^((\\.0{1,2})?|[1-9]?\\d(\\.\\d{1,2})?)$')]),
      seniorityAllowance: new FormControl(dataItem.seniorityAllowance,[Validators.maxLength(5),Validators.pattern('^(100(\\.0{1,2})?|[1-9]?\\d(\\.\\d{1,2})?)$')]),
      vocationalAllowance: new FormControl(dataItem.vocationalAllowance,[Validators.maxLength(5),Validators.pattern('^(100(\\.0{1,2})?|[1-9]?\\d(\\.\\d{1,2})?)$')]),
      preferentialAllowance: new FormControl(dataItem.preferentialAllowance,[Validators.maxLength(5),Validators.pattern('^(100(\\.0{1,2})?|[1-9]?\\d(\\.\\d{1,2})?)$')]),
      prefrentialAllowLeadership: new FormControl(dataItem.prefrentialAllowLeadership,[Validators.maxLength(5),Validators.pattern('^(100(\\.0{1,2})?|[1-9]?\\d(\\.\\d{1,2})?)$')]),
      salaryAmount: new FormControl(dataItem.salaryAmount,[Validators.maxLength(5),Validators.pattern('^(100(\\.0{1,2})?|[1-9]?\\d(\\.\\d{1,2})?)$')]),
      appliedDate: new FormControl(new Date(dataItem.appliedDate) , Validators.required),
      description: new FormControl(dataItem.description,[Validators.maxLength(250)]),
    });

    this.editedRowIndex = rowIndex;
    sender.editRow(rowIndex, this.formDataSalary);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    this.loading = true;
    const empWork: EmployeeSalary = formGroup.value;
    empWork.isActive = true;
    empWork.isFostering = false;
    empWork.appliedDate = this.datePipe.transform(empWork.appliedDate,'yyyy/MM/dd');
    if(this.formDataSalary.value.employeeScale){
      let e: PublicServantModel[];
      this.ngachHang$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(data=>{
        e = (data.filter(datas => datas.cateCode === this.formDataSalary.value.employeeScale));
      })
      empWork.employeeScaleName = e[0].cateName;
    }
    if(this.formDataSalary.value.salaryLevel){
      let l: Category[];
      this.bacLuong$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(data=>{
        l = (data.filter(datas => datas.cateCode === this.formDataSalary.value.salaryLevel));
      })
      empWork.salaryLevelName = l[0].cateName;
    }
    if(!this.formDataSalary.valid){
      this.loading = false;
      this.validateForm(formGroup,empWork);
    } else if(((parseInt(empWork.appliedDate.trim().substring(0, 4), 10))< 1000)
      ||((parseInt(empWork.appliedDate.trim().substring(0, 4), 10))> 9999)){
      this.notiService.showNoti('Ngày hưởng thông tin nhập sai!', 'error');
      document.getElementById('appliedDate').focus();
      this.loading = false;
    } else {
      if (empWork.id === null) {
        this.employeeSalaryService.createEmployeeSalary(empWork).subscribe(data => {
          this.notiService.createSuccess();
          this.loadData();
          sender.closeRow(rowIndex);
        }, error => this.loading = false);
      } else {
        this.employeeSalaryService.EditMultiple(empWork.id, this.employeeSalaryAllwanceId, empWork).subscribe(data => {
          this.notiService.updateSuccess();
          this.loadData();
          sender.closeRow(rowIndex);
        }, error => this.loading = false);
      }
    }
  }
  cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }
  validateForm(formDataSalary: FormGroup, empWork: EmployeeSalary) {
    if (formDataSalary.controls.appliedDate.errors?.required) {
      this.notiService.showNoti('Ngày hưởng không được để trống!', 'error');
      document.getElementById('appliedDate').focus();
    } else if (formDataSalary.controls.salaryLevel.errors?.required) {
      this.notiService.showNoti('Bậc lương không được để trống!', 'error');
      document.getElementById('salaryLevel').focus();
    } else if (formDataSalary.controls.coefficient.errors?.required) {
      this.notiService.showNoti('Hệ số lương không được để trống!', 'error');
      document.getElementById('coefficient').focus();
    } else if (formDataSalary.controls.coefficient.errors?.maxlength) {
      this.notiService.showNoti('Hệ số lương tối đa 5 kí tự!', 'error');
      document.getElementById('coefficient').focus();
    } else if (formDataSalary.controls.seniorityAllowance.errors?.maxlength) {
      this.notiService.showNoti('Mức phụ cấp thâm niên tối đa 5 kí tự!', 'error');
      document.getElementById('seniorityAllowance').focus();
    } else if (formDataSalary.controls.vocationalAllowance.errors?.maxlength) {
      this.notiService.showNoti('Mức phụ cấp thu hút nghề tối đa 5 kí tự!', 'error');
      document.getElementById('vocationalAllowance').focus();
    } else if (formDataSalary.controls.preferentialAllowance.errors?.maxlength) {
      this.notiService.showNoti('Mức phụ cấp ưu đãi nghề tối đa 5 kí tự!', 'error');
      document.getElementById('preferentialAllowance').focus();
    } else if (formDataSalary.controls.prefrentialAllowLeadership.errors?.maxlength) {
      this.notiService.showNoti('Mức phụ cấp chức vụ lãnh đạo tối đa 5 kí tự!', 'error');
      document.getElementById('prefrentialAllowLeadership').focus();
    } else if (formDataSalary.controls.salaryAmount.errors?.maxlength) {
      this.notiService.showNoti('Vượt khung tối đa 5 kí tự!', 'error');
      document.getElementById('salaryAmount').focus();
    } else if (formDataSalary.controls.description.errors?.maxlength) {
      this.notiService.showNoti('Ghi chú tối đa 250 kí tự!', 'error');
      document.getElementById('description').focus();
    } else if (formDataSalary.controls.coefficient.errors?.pattern) {
      this.notiService.showNoti('Hệ số lương thông tin nhập sai! (0-99.99%)', 'error');
      document.getElementById('coefficient').focus();
    } else if (formDataSalary.controls.seniorityAllowance.errors?.pattern) {
      this.notiService.showNoti('Mức phụ cấp thâm niên thông tin nhập sai!(0-100%)', 'error');
      document.getElementById('seniorityAllowance').focus();
    } else if (formDataSalary.controls.vocationalAllowance.errors?.pattern) {
      this.notiService.showNoti('Mức phụ cấp thu hút nghề thông tin nhập sai! (0-100%)', 'error');
      document.getElementById('vocationalAllowance').focus();
    } else if (formDataSalary.controls.preferentialAllowance.errors?.pattern) {
      this.notiService.showNoti('Mức phụ cấp ưu đãi nghề thông tin nhập sai! (0-100%)', 'error');
      document.getElementById('preferentialAllowance').focus();
    } else if (formDataSalary.controls.prefrentialAllowLeadership.errors?.pattern) {
      this.notiService.showNoti('Mức phụ cấp chức vụ lãnh đạo thông tin nhập sai! (0-100%)', 'error');
      document.getElementById('prefrentialAllowLeadership').focus();
    } else if (formDataSalary.controls.salaryAmount.errors?.pattern) {
      this.notiService.showNoti('Vượt khung thông tin nhập sai! (0-100%)', 'error');
      document.getElementById('salaryAmount').focus();
    }
  }

}
