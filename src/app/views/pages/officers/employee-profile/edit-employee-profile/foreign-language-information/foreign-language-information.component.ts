import {Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {EmployeeModel} from '../../../../../../core/employee';
import {locale} from '../../../../../../core/_config/i18n/vi';
import {BehaviorSubject, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AllCategoriesRequested, Category, getCate, getCateLoaded} from '../../../../../../core/category';
import {takeUntil} from 'rxjs/operators';
import {AppState} from '../../../../../../core/reducers';
import {NgUnsubscribe} from '../../../../../shared/directives';
import { EmployeeProfileModel } from 'src/app/core/service/model/Employee-profile';
import {
  EmployeeForeignLanguageModel, getAllEmployeeForeignLanguage, EmployeeForeignLanguageService
} from '../../../../../../core/employee/foreign-language';
import {CategoryType} from '../../../../../../core/_constants';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {process, State} from '@progress/kendo-data-query';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NotiService} from '../../../../../../core/service/service-model/notification.service';
import {DatePipe} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/core/service/service-model/employee.service';
import {EmployeeSalary} from "../../../../../../core/employee/salary/salary-employee.model";

@Component({
  selector: 'kt-foreign-language-information',
  templateUrl: './foreign-language-information.component.html',
  styleUrls: ['./foreign-language-information.component.scss']
})
export class ForeignLanguageInformationComponent extends NgUnsubscribe implements OnInit {

  employee: EmployeeProfileModel;
  nameEmp: string;
  checkDelete = true;
  dataItem: EmployeeModel;
  @ViewChild('deleteDialog') deleteDialog;
  pageSizes: Array<number> = [10, 20];
  _pageSize = 5;
  gridView: GridDataResult;
  pageSize = 10;
  skip = 0;
  mySelection: string[] = [];
  maxDate= new Date();
  VI_LANG = locale.data;
  showLoading = true;
  defaultCategory: Category = {cateCode: null, cateName: 'Lựa chọn'};
  loadingKendoGrid : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  itemData: EmployeeForeignLanguageModel[];
  empId: string;

  // Danh mục ngoại ngữ khác - Ngoại ngữ khác
  otherForeignLanguages$: Observable<Category[]>;
  otherForeignLanguagesLoaded$: Observable<boolean>;

  // Danh mục trình độ ngoại ngữ - Trình độ ngoại ngữ
  levelForeignLanguages$: Observable<Category[]>;
  levelForeignLanguagesLoaded$: Observable<boolean>;

  // Lấy danh sách hồ sơ cán bộ thông tin ngoại ngữ
  employeeForeignLanguage$: Observable<EmployeeForeignLanguageModel>;
  employeeForeignLanguageLoaded$: Observable<boolean>;

  formData: FormGroup;

  listNgoaiNguKhac: Category[] = [];

  listTrinhDoNgoaiNgu: Category[] = [];

  dataForm: EmployeeForeignLanguageModel[];
  stateGrid: State = {
    skip: this.skip,
    take: this._pageSize,
  }
  loadingSubmit: boolean;
  editedRowIndex: number;

  constructor(
    private store: Store<AppState>,
    private empService: EmployeeForeignLanguageService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private notificationService: NotiService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getEmployee();
    this.initCates();
  }

  getEmployee() {
    this.loadingKendoGrid.next(true);
    this.route.params.subscribe(params => {
      if (params.id) {
        this.employeeService.getEmployeeByID(params.id).subscribe(data => {
          if (data) {
            this.employee = data;
            this.nameEmp = data.fullName;
            this.loadDataToGrid();
          }
        }, () => this.loadingKendoGrid.next(false));
      }
    });
  }

  initCates() {
    // Danh mục ngoại ngữ khác - Ngoại ngữ khác
    this.otherForeignLanguages$ = this.store.pipe(select(getCate, CategoryType.DM_NGOAI_NGU), takeUntil(this.ngUnsubscribe));
    this.otherForeignLanguagesLoaded$ = this.store.pipe(select(getCateLoaded, CategoryType.DM_NGOAI_NGU), takeUntil(this.ngUnsubscribe));

    // Danh mục trạng thái cán bộ - Trạng thái
    this.levelForeignLanguages$ = this.store.pipe(select(getCate, CategoryType.DM_TRINH_DO_NGOAI_NGU), takeUntil(this.ngUnsubscribe));
    this.levelForeignLanguagesLoaded$ = this.store.pipe(select(getCateLoaded, CategoryType.DM_TRINH_DO_NGOAI_NGU), takeUntil(this.ngUnsubscribe));

    // Lấy danh sách hồ sơ cán bộ thông tin ngoại ngữ
    this.employeeForeignLanguage$ = this.store.pipe(select(getAllEmployeeForeignLanguage), takeUntil(this.ngUnsubscribe));
  }

  // Danh mục ngoại ngữ khác - Ngoại ngữ khác
  fetchOtherForeignLanguages(): void {
    this.otherForeignLanguages$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (!response) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_NGOAI_NGU}));
      }  else {
        if (this.dataForm) {
          this.dataForm.forEach(item => {
            this.listNgoaiNguKhac.push(response.find(cate => cate.cateCode === item.languageCode));
          })
        } else {
          this.listNgoaiNguKhac.push(this.defaultCategory);
        }
        this.cdr.detectChanges();
      }
    })
  }

  // Danh mục loại cán bộ
  fetchLevelForeignLanguages(): void {
    this.levelForeignLanguages$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (!response) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_TRINH_DO_NGOAI_NGU}));
      } else {
        if (this.dataForm) {
          this.dataForm.forEach(item => {
            this.listTrinhDoNgoaiNgu.push(response.find(cate => cate.cateCode === item.languageLevelCode))
          })
        } else {
          this.listTrinhDoNgoaiNgu.push(this.defaultCategory);
        }
        this.cdr.detectChanges();
      }
    })
  }

  // Lấy danh sách hồ sơ cán bộ thông tin ngoại ngữ
  loadDataToGrid() {
    this.loadingKendoGrid.next(true);
    this.empService.getAllEmployeeForeignLangague(this.employee.id, this.skip, this._pageSize).subscribe(data => {
      // @ts-ignore
      if (data) {
        this.gridView = ({
          data: data.items,
          total: data.totalCount
        });
        this.itemData = data.items;
        this.dataForm = data.items;
        if(this.dataForm) {
          this.fetchOtherForeignLanguages();
          this.fetchLevelForeignLanguages();
        }
      }
      this.loadingKendoGrid.next(false);
    }, error => {
      this.loadingKendoGrid.next(true);
    });
  }

  pageChange(event: PageChangeEvent) {
    this.skip = event.skip;
    this.loadDataToGrid();
    this.showLoading = true;
  }

  pageSizeChange() {
    this.skip = this._pageSize * Math.floor(this.skip / this._pageSize);
    this.loadDataToGrid();
    this.showLoading = true;
  }

  onChange(row: any): void {
    this.mySelection = row;
    if (this.mySelection.length > 0) {
      this.checkDelete = false;
    } else {
      this.checkDelete = true;
    }
  }

  openModalDelete(dataItem: any) {
    this.modalService.open(this.deleteDialog, {
      size: 'small',
      centered: true
    });
    document.getElementById('focusDelete').focus();
  }

  saveData(dataItem: any) {

  }

  closeModalDelete() {
    this.modalService.dismissAll();
  }

  submitDelete() {
    this.loadingSubmit = true;
    this.empService.deleteEmployeeForeignLanguage(this.employee.id,this.mySelection).subscribe(data => {
      this.closeModalDelete();
      this.notificationService.deleteSuccess();
      this.loadingSubmit = false;
      this.loadDataToGrid();
    });
    this.checkDelete = true;
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formData = undefined;
  }

  addNewItem() {
    const element: HTMLElement = document.getElementById('addBtn') as HTMLElement;
    element.click();
  }

  loadItems() {
    this.gridView = process(this.itemData, this.stateGrid);
  }

  trimSpace(formName: string) {
    if (formName) {
      this.formData.get(formName).setValue(
        this.formData.get(formName).value?.trim().replace(/(\s\s+| )/g, ' ')
      )
    }
  }

  addHandler({ sender }) {
    this.closeEditor(sender);
    this.formData = new FormGroup({
      id: new FormControl(),
      employeeId: new FormControl(this.employee.id),
      employeeName: new FormControl(this.employee.fullName),
      languageCode: new FormControl('', Validators.required),
      languageName: new FormControl(''),
      languageLevelCode: new FormControl('', Validators.required),
      languageLevelName: new FormControl(''),
      issueDate: new FormControl('', Validators.required),
      score: new FormControl('', [Validators.required, Validators.maxLength(4),
        Validators.pattern('^(10|(\\d)|\\d(\\.\\d{1,2})?)$')]),
      description: new FormControl('', Validators.maxLength(250))
    });
    sender.addRow(this.formData);
  }

  cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }

  editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);
    this.formData = new FormGroup({
      id: new FormControl(dataItem.id),
      employeeId: new FormControl(dataItem.employeeId),
      languageCode: new FormControl(dataItem.languageCode, Validators.required),
      languageName: new FormControl(dataItem.languageName),
      languageLevelCode: new FormControl(dataItem.languageLevelCode, Validators.required),
      languageLevelName: new FormControl(dataItem.languageLevelName),
      issueDate: new FormControl(new Date(+
        this.datePipe.transform(dataItem.issueDate,'dd/MM/yyyy').split('/')[2],+
        this.datePipe.transform(dataItem.issueDate,'dd/MM/yyyy').split('/')[1] - 1, +
        this.datePipe.transform(dataItem.issueDate,'dd/MM/yyyy').split('/')[0]) , Validators.required),
      score: new FormControl(dataItem.score, [Validators.required, Validators.maxLength(4),
        Validators.pattern('^(10|(\\d)|\\d(\\.\\d{1,2})?)$')]),
      description: new FormControl(dataItem.description , Validators.maxLength(250))
    });

    this.editedRowIndex = rowIndex;
    sender.editRow(rowIndex, this.formData);
  }

  saveHandler({ sender, rowIndex, formGroup, dataItem }) {
    this.loadingKendoGrid.next(true);
    if(this.formData.value.languageCode){
      let e: Category[];
      this.otherForeignLanguages$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(data=>{
        e = (data.filter(datas => datas.cateCode === this.formData.value.languageCode));
      })
      this.formData.value.languageName = e[0].cateName;
      this.formData.value.languageCode = e[0].cateCode;
    }
    if(this.formData.value.languageLevelCode){
      let l: Category[];
      this.levelForeignLanguages$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(data=>{
        l = (data.filter(datas => datas.cateCode === this.formData.value.languageLevelCode));
      })
      this.formData.value.languageLevelName = l[0].cateName;
      this.formData.value.languageLevelCode = l[0].cateCode;
    }
    const empFL: EmployeeForeignLanguageModel = this.formData.value;

    empFL.issueDate = this.datePipe.transform(empFL.issueDate,'yyyy/MM/dd');
    if(!this.formData.valid){
      this.loadingKendoGrid.next(false);
      this.validateForm(formGroup,empFL);
    } else if (empFL.id === null || !empFL.id) {
      this.empService.addEmployeeForeignLanguage(this.employee.id, empFL).subscribe(data => {
        this.notificationService.createSuccess();
        this.loadingKendoGrid.next(false);
        this.loadDataToGrid();
        sender.closeRow(rowIndex);
      }, () => this.loadingKendoGrid.next(false));
    } else {
      this.empService.editEmployeeForeignLanguage(this.employee.id, empFL).subscribe(data => {
        this.notificationService.updateSuccess();
        this.loadDataToGrid();
        sender.closeRow(rowIndex);
      }, () => this.loadingKendoGrid.next(false));
    }
  }
  validateForm(formData: FormGroup, empFL: EmployeeForeignLanguageModel) {
    if (formData.controls.languageCode.errors?.required) {
      this.notificationService.showNoti('Ngoại ngữ khác không được để trống!', 'error');
      document.getElementById('languageCode').focus();
    } else if (formData.controls.languageLevelCode.errors?.required) {
      this.notificationService.showNoti('Trình độ ngoại ngữ không được để trống!', 'error');
      document.getElementById('languageLevelCode').focus();
    } else if (formData.controls.issueDate.errors?.required) {
      this.notificationService.showNoti('Ngày cấp không được để trống!', 'error');
      document.getElementById('issueDate').focus();
    } else if (formData.controls.score.errors?.required) {
      this.notificationService.showNoti('Điểm ngoại ngữ không được để trống!', 'error');
      document.getElementById('score').focus();
    } else if (formData.controls.score.errors?.maxlength) {
      this.notificationService.showNoti('Điểm ngoại ngữ tối đa 4 kí tự!', 'error');
      document.getElementById('score').focus();
    } else if (formData.controls.description.errors?.maxlength) {
      this.notificationService.showNoti('Ghi chú tối đa 250 kí tự!', 'error');
      document.getElementById('description').focus();
    } else if (formData.controls.score.errors?.pattern) {
      this.notificationService.showNoti('Điểm ngoại ngữ thông tin nhập sai! (0-10)', 'error');
      document.getElementById('score').focus();
    }
  }
}
