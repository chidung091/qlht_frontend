import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {SchoolFacultyService} from '../../../../../core/service/service-model/school-faculty.service';
import {EmployeeProfileModel} from '../../../../../core/service/model/Employee-profile';
import {EmployeeService} from '../../../../../core/service/service-model/employee.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {locale} from '../../../../../core/_config/i18n/vi';
import {AllCategoriesRequested, Category, getCate, getCateLoaded} from '../../../../../core/category';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../../../core/reducers';
import {BehaviorSubject, Observable} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {NotiService} from '../../../../../core/service/service-model/notification.service';
import {TransferWorkComponent} from './transfer-work/transfer-work.component';
import {DatePipe} from '@angular/common';
import {takeUntil} from 'rxjs/operators';
import {CategoryType} from '../../../../../core/_constants';
import {ImportFileExcelComponent} from './import-file-excel/import-file-excel.component';
import {CommonStore, SchoolFacultyModel} from '../../../../../core/common';

@Component({
  selector: 'kt-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends CommonStore implements OnInit {

  mySelection: string[] = [];
  VI_LANG = locale.data;
  isCollapsed = false;
  pageSizes: Array<number> = [5, 10, 20];
  _pageSize = 5;
  pageSize = 10;
  skip = 0;
  defaultDepartment: { id: string, facultyName: string } = {id: null, facultyName: 'Lựa chọn'};
  defaultCategory = {cateCode: null, cateName: 'Lựa chọn'};
  @ViewChild('deleteDialog') deleteDialog;
  dataItem: EmployeeProfileModel;
  gridView: GridDataResult;
  showLoading = true;
  loadingKendoGrid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  checkDeleteMany = true;
  totalItem: Observable<number>;
  loadingSubmit: boolean;
  public maxDate = new Date();

  dataButtonFix: Array<any> = [
    {
      id: '1', text: 'Phân công giảng dạy'
    }, {
      id: '2', text: 'Cập nhật hồ sơ'
    }, {
      id: '3', text: 'Chuyển công tác',
    }, {
      id: '4', text: 'Cập nhật nghỉ hưu'
    }, {
      id: '5', text: 'Cập nhật nghỉ việc'
    }, {
      id: '6', text: 'Cập nhật tạm nghỉ'
    }];

  // Danh mục loại cán bộ - Công việc
  employeesType$: Observable<Category[]>;
  employeesTypeLoaded$: Observable<boolean>;

  // Danh mục trạng thái cán bộ - Trạng thái
  staffStatus$: Observable<Category[]>;
  staffStatusLoaded$: Observable<boolean>;

  // Danh mục trình độ chuyên môn - Trình độ đào tạo
  qualification$: Observable<Category[]>;
  qualificationLoaded$: Observable<boolean>;

  // Danh mục giới tính - Giới tính
  gender$: Observable<Category[]>;
  genderLoaded$: Observable<boolean>;

  // Danh mục hình thức hợp đồng - Hình thức hợp đồng
  contractForm$: Observable<Category[]>;
  contractFormLoaded$: Observable<boolean>;

  dataSearchToBoMon: '';
  dataSearchCongViec: '';
  dataSearchTrangThai: '';
  dataSearchGioiTinh: '';
  dataSearchHTHD: '';
  dataSearchTrinhDoDT: '';
  dataSearchMaCanBo: '';
  dataSearchTenCanBo: '';
  dataSearchNgaySinh: '';
  public formSearch: FormGroup = new FormGroup({
    department: new FormControl(''),
    dmLoaiCanBo: new FormControl(''),
    dmTrangThaiCanBo: new FormControl(''),
    dmSex: new FormControl(''),
    dmHinhThucHopDong: new FormControl(''),
    dmTrinhDoChuyenMon: new FormControl(''),
    code: new FormControl('', Validators.maxLength(50)),
    fullName: new FormControl('', Validators.maxLength(50)),
    birthDate: new FormControl(''),
  });

  constructor(
    public router: Router,
    private schoolFacultyService: SchoolFacultyService,
    private employeeService: EmployeeService,
    public store: Store<AppState>,
    private modalService: NgbModal,
    private notificationService: NotiService,
    private datepie: DatePipe
  ) {
    super(store);
  }

  initCates() {
    // Danh mục loại cán bộ
    this.employeesType$ = this.store.pipe(select(getCate, CategoryType.DM_LOAI_CAN_BO), takeUntil(this.ngUnsubscribe));
    this.employeesTypeLoaded$ = this.store.pipe(select(getCateLoaded, CategoryType.DM_LOAI_CAN_BO), takeUntil(this.ngUnsubscribe));

    // Danh mục trạng thái cán bộ - Trạng thái
    this.staffStatus$ = this.store.pipe(select(getCate, CategoryType.DM_TRANG_THAI_CAN_BO), takeUntil(this.ngUnsubscribe));
    this.staffStatusLoaded$ = this.store.pipe(select(getCateLoaded, CategoryType.DM_TRANG_THAI_CAN_BO), takeUntil(this.ngUnsubscribe));

    // Danh mục trình độ chuyên môn - Trình độ đào tạo
    this.qualification$ = this.store.pipe(select(getCate, CategoryType.DM_TRINH_DO_CHUYEN_MON), takeUntil(this.ngUnsubscribe));
    this.qualificationLoaded$ = this.store.pipe(select(getCateLoaded, CategoryType.DM_TRINH_DO_CHUYEN_MON), takeUntil(this.ngUnsubscribe));

    // Danh mục giới tính - Giới tính
    this.gender$ = this.store.pipe(select(getCate, CategoryType.DM_GIOI_TINH), takeUntil(this.ngUnsubscribe));
    this.genderLoaded$ = this.store.pipe(select(getCateLoaded, CategoryType.DM_GIOI_TINH), takeUntil(this.ngUnsubscribe));

    // Danh mục hình thức hợp đồng - Hình thức hợp đồng
    this.contractForm$ = this.store.pipe(select(getCate, CategoryType.DM_HINH_THUC_HOP_DONG), takeUntil(this.ngUnsubscribe));
    this.contractFormLoaded$ = this.store.pipe(select(getCateLoaded, CategoryType.DM_HINH_THUC_HOP_DONG), takeUntil(this.ngUnsubscribe));

  }

  ngOnInit(): void {
    this.initCates();
    this.fetchEmployeesType();
    this.fetchStaffStatus();
    this.fetchQualification();
    this.fetchGender();
    this.fetchContractForm();
    this.loadDataToGrid();
  }

  // Danh mục loại cán bộ
  fetchEmployeesType(): void {
    this.employeesType$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (!response) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_LOAI_CAN_BO}));
      }
    })
  }

  // Danh mục trạng thái cán bộ - Trạng thái
  fetchStaffStatus(): void {
    this.staffStatus$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (!response) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_TRANG_THAI_CAN_BO}));
      }
    })
  }

  // Danh mục trình độ chuyên môn - Trình độ đào tạo
  fetchQualification(): void {
    this.qualification$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (!response) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_TRINH_DO_CHUYEN_MON}));
      }
    })
  }

  // Danh mục giới tính - Giới tính
  fetchGender(): void {
    this.gender$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (!response) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_GIOI_TINH}));
      }
    })
  }

  // Danh mục hình thức hợp đồng - Hình thức hợp đồng
  fetchContractForm(): void {
    this.contractForm$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (!response) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_HINH_THUC_HOP_DONG}));
      }
    })
  }

  searchEmployee() {
    this.dataSearchToBoMon = this.formSearch.get('department').value;
    this.dataSearchCongViec = this.formSearch.get('dmLoaiCanBo').value;
    this.dataSearchTrangThai = this.formSearch.get('dmTrangThaiCanBo').value;
    this.dataSearchGioiTinh = this.formSearch.get('dmSex').value;
    this.dataSearchHTHD = this.formSearch.get('dmHinhThucHopDong').value;
    console.log(this.dataSearchHTHD)
    this.dataSearchTrinhDoDT = this.formSearch.get('dmTrinhDoChuyenMon').value;
    this.dataSearchMaCanBo = this.formSearch.get('code').value.replace(/(\s\s+| )/g, ' ').trim();
    this.dataSearchTenCanBo = this.formSearch.get('fullName').value.replace(/(\s\s+| )/g, ' ').trim();
    const DateSearch: any = this.datepie.transform(this.formSearch.get('birthDate').value, 'yyyy/MM/dd');
    this.dataSearchNgaySinh = DateSearch;
    this.skip = 0;
    console.log(this.formSearch.value)
    this.loadDataToGrid();
  }

  loadDataToGrid() {
    this.loadingKendoGrid.next(true);
    this.employeeService.getDataSubding(this.dataSearchToBoMon, this.dataSearchCongViec, this.dataSearchTrangThai,
      this.dataSearchGioiTinh, this.dataSearchHTHD, this.dataSearchTrinhDoDT, this.dataSearchMaCanBo, this.dataSearchTenCanBo,
      this.dataSearchNgaySinh, this._pageSize, this.skip).subscribe(data => {
      if (data) {
        this.gridView = ({
          data: data.items,
          total: data.totalCount
        });
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
    if (this.mySelection.length === 1) {
      this.checkDeleteMany = false;
    } else {
      this.checkDeleteMany = true;
    }
  }

  public openModalDelete(dataItem: EmployeeProfileModel) {
    this.modalService.open(this.deleteDialog, {
      size: 'small',
      centered: true
    });
    document.getElementById('deleteElement').focus();
  }

  closeModalDelete() {
    this.modalService.dismissAll();
  }

  submitDelete() {
    this.loadingSubmit = true;
    this.employeeService.deleteEmployee(this.mySelection[0]).subscribe(data => {
      this.closeModalDelete();
      this.notificationService.deleteSuccess();
      this.loadingSubmit = false;
      this.loadDataToGrid();
    });
    this.checkDeleteMany = true;
    this.mySelection = [];
  }

  openModalEdit(dataItem: any) {
    this.router.navigateByUrl('/officers/employee-profile/edit-profile/' + dataItem.id);
  }

  openModalAdd() {
    this.router.navigateByUrl('/officers/employee-profile/add-new-profile');
  }

  openModalConfig(dataItem, dataGridItem) {
    if (dataItem.id === '3') {
      const dialogRef = this.modalService.open(TransferWorkComponent, {
        size: 'lg',
        centered: true,
      });
      dialogRef.componentInstance.title = 'Chuyển công tác';
      dialogRef.result
        .then(() => {
          this.loadDataToGrid();
        })
        .catch((error) => error);
    }
    if (dataItem.id === '2') {
      this.openModalEdit(dataGridItem);
    }
  }

  openImportFileExcel() {
    const dialog = this.modalService.open(ImportFileExcelComponent, {
      size: 'lg',
      centered: true
    });
    dialog.componentInstance.title = 'Import File Excel';
    dialog.result
      .then(() => {
        this.loadDataToGrid();
      })
      .catch((error) => error);
  }

  trimSpace(formName: string) {
    if (formName) {
      this.formSearch.get(formName).setValue(
        this.formSearch.get(formName).value?.trim().replace(/(\s\s+| )/g, ' ')
      )
    }
  }
}
