import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {select, Store as StoreRx} from '@ngrx/store';
import {AppState} from '../../../../../../core/reducers';
import {Observable} from 'rxjs';
import {AllCategoriesRequested, Category, getCate, getCateLoaded, ListCateCode} from '../../../../../../core/category';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {finalize, map, takeUntil} from 'rxjs/operators';
import {CategoryType} from '../../../../../../core/_constants';
import {RegexValidators} from '../../../../../../core/_constants/regex'
import {selectSchoolLevels} from '../../../../../../core/auth';
import {SchoolLevel} from '../../../../../../core/auth/_models';
import {EmployeeProfileService} from '../../employee-profile.service';
import {
  GetAllProvinces,
  getAllProvinces,
  GetDistrictByProvinceCode,
  getDistrictsByProvinceCode,
  GetWardsByDistrictCode,
  getWardsByDistrictCode,
  isDistrictsLoaded,
  isProvincesLoaded,
  isWardsLoaded,
  ProvinceModel,
  ResetWards
} from '../../../../../../core/location';
import {CommonStore} from '../../../../../../core/common';

@Component({
  selector: 'kt-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralInfoComponent extends CommonStore implements OnInit {
  @Input() dataForm: FormGroup
  @Input() editData: any
  @Input() submitStatus: boolean
  listDanToc$: Observable<Category[]>
  listDanTocLoad$: Observable<boolean>
  listTonGiao$: Observable<Category[]>
  listTonGiaoLoad$: Observable<boolean>
  listCapDay$: Observable<Category[]>
  listCapDayLoad$: Observable<boolean>
  listViTriLamViec$: Observable<Category[]>
  listViTriLamViecLoad$: Observable<boolean>
  listChucVu$: Observable<Category[]>
  listChucVuLoad$: Observable<boolean>
  listMonDay$: Observable<Category[]>
  listMonDayLoad$: Observable<boolean>
  listHinhThucHopDong$: Observable<Category[]>
  listHinhThucHopDongLoad$: Observable<boolean>
  listGioiTinh$: Observable<Category[]>
  listGioiTinhLoad$: Observable<boolean>
  levels$: Observable<SchoolLevel[]>;
  public imagePath;
  public defaultImg = '../../../../../assets/media/users/default.jpg'
  imgSignature: any;
  imgAvatar: any;
  public fileContentAvatar = null;
  public fileContentSign = null;
  public nowDate: Date = new Date()
  public minDate: Date = new Date(1900, 1, 1)
  public defaultProvince = {provinceName: 'Lựa chọn tỉnh/thành', provinceCode: null};
  public defaultDistrict = {districtName: 'Lựa chọn quận/huyện', districtCode: null};
  public defaultWard = {wardName: 'Lựa chọn phường/xã', wardCode: null};
  public defaultToBoMon = {facultyName: 'Lựa chọn', id: null}
  public defaultDropdownItem = {id: null, cateCode: null, cateName: 'Lựa chọn'}
  public defaultLevel = {id: null, schoolLevelCode: null, schoolLevelName: 'Lựa chọn'}
  public listJob: Category[];
  public listJobLoading = false;

  // @Select(ProvinceState.getAllProvince) province$: Observable<ProvinceModel[]>
  // @Select(DistrictState.getList) districts$: Observable<DistrictModel[]>
  // @Select(WardsState.getWardsOfDistrict) ward$: Observable<WardsModel[]>
  // @Select(DepartmentState.listDepartment) listDepartment$: Observable<Department[]>;
  // loadingProvince = false

  provinces$: Observable<ProvinceModel[]>
  provincesLoaded$: Observable<boolean>
  districts$: Observable<ProvinceModel[]>
  districtsLoaded$: Observable<boolean>
  wards$: Observable<ProvinceModel[]>
  wardsLoaded$: Observable<boolean>

  constructor(
    public domFile: DomSanitizer,
    private storeRx: StoreRx<AppState>,
    public router: Router,
    public employeeProfileService: EmployeeProfileService,
    private ref: ChangeDetectorRef,
  ) {
    super(storeRx);
  }

  public buildForm() {
    this.dataForm.addControl('genderCode', new FormControl(null, [Validators.required,]));
    this.dataForm.addControl('genderName', new FormControl(null, []));
    this.dataForm.addControl('identificationCode', new FormControl(null, [Validators.required, Validators.maxLength(50)]));
    this.dataForm.addControl('nation', new FormControl(null, [Validators.required]));
    this.dataForm.addControl('religion', new FormControl(null, []));
    this.dataForm.addControl('phone', new FormControl(null, [Validators.maxLength(50), Validators.pattern(RegexValidators.phoneNumber)]));
    this.dataForm.addControl('homeTown', new FormControl(null, [Validators.maxLength(50)]));
    this.dataForm.addControl('positionStaffCode', new FormControl(null, [Validators.required]));
    this.dataForm.addControl('positionStaffName', new FormControl(null, []));
    this.dataForm.addControl('code', new FormControl({disabled: true, value: null}, [Validators.required, Validators.maxLength(50)]));
    // this.dataForm.addControl('code', new FormControl('', [Validators.required, Validators.maxLength(50)]));
    this.dataForm.addControl('identityNumber', new FormControl(null, [Validators.maxLength(50), Validators.pattern(RegexValidators.number)]));
    this.dataForm.addControl('isLeader', new FormControl(false, []));
    this.dataForm.addControl('isNew', new FormControl(false, []));
    this.dataForm.addControl('facultyId', new FormControl(null, [Validators.required]));
    this.dataForm.addControl('facultyName', new FormControl(null, []));
    this.dataForm.addControl('fullName', new FormControl(null, [Validators.required, Validators.maxLength(100)]));
    this.dataForm.addControl('alias', new FormControl(null, [Validators.maxLength(100)]));
    this.dataForm.addControl('permanentAddress', new FormControl(null, []));
    this.dataForm.addControl('birthDate', new FormControl(null, [Validators.required]));
    this.dataForm.addControl('joinedDate', new FormControl(null, [Validators.required]));
    this.dataForm.addControl('identityIssuedDate', new FormControl(null, []));
    this.dataForm.addControl('identityIssuedPlace', new FormControl(null, [Validators.maxLength(50)]));
    this.dataForm.addControl('healthStatus', new FormControl(null, [Validators.maxLength(100)]));
    this.dataForm.addControl('email', new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.pattern(RegexValidators.email)]));
    this.dataForm.addControl('provinceCode', new FormControl(this.defaultProvince.provinceCode, []));
    this.dataForm.addControl('provinceName', new FormControl(this.defaultProvince.provinceName, []));
    this.dataForm.addControl('districtCode', new FormControl(this.defaultDistrict.districtCode, []));
    this.dataForm.addControl('districtName', new FormControl(this.defaultDistrict.districtName, []));
    this.dataForm.addControl('communeCode', new FormControl(this.defaultWard.wardCode, []));
    this.dataForm.addControl('communeName', new FormControl(this.defaultWard.wardName, []));
    this.dataForm.addControl('mainLevelTeachingCode', new FormControl(null, [Validators.required]));
    this.dataForm.addControl('mainLevelTeachingName', new FormControl(null, []));
    this.dataForm.addControl('positionGroupCode', new FormControl(null, [Validators.required]));
    this.dataForm.addControl('positionGroupName', new FormControl(null, []));
    this.dataForm.addControl('homeTown', new FormControl(null, [Validators.maxLength(200)]));
    this.dataForm.addControl('subjectTaught', new FormControl(null, []));
    this.dataForm.addControl('contractType', new FormControl(null, [Validators.required]));
    this.dataForm.addControl('imageSrc', new FormControl(null, []));
    this.dataForm.addControl('signatureSrc', new FormControl(null, []));
    this.dataForm.addControl('name', new FormControl(null, []));
  }

  selectMatinh(value) {
    this.dataForm.get('districtCode').setValue(null)
    this.dataForm.get('communeCode').setValue(null)
    // this.store.dispatch(new ResetWard());
    // this.store.dispatch(new ResetDistrict());
    this.storeRx.dispatch(new ResetWards());
    this.dataForm.get('provinceName').setValue(value.provinceName)
    this.getDistrict(value, 'select')
  }

  selectMaQuan(value) {
    this.dataForm.get('communeCode').setValue(null)
    // this.store.dispatch(new ResetWard());
    this.dataForm.get('districtName').setValue(value.districtName)
    this.getWards(value, 'select')
  }

  selectMaXa(value) {
    this.dataForm.get('communeName').setValue(value.wardName)
  }


  getDistrict(value, type) {
    if (type === 'edit') {
      this.storeRx.dispatch(new GetDistrictByProvinceCode(value));
    } else {
      this.storeRx.dispatch(new GetDistrictByProvinceCode(value.provinceCode));
    }
  }

  getWards(value, type) {
    if (type === 'edit') {
      this.storeRx.dispatch(new GetWardsByDistrictCode(value));
    } else {
      this.storeRx.dispatch(new GetWardsByDistrictCode(value.districtCode));
    }
  }

  fileChange(e, type) {
    const file = e.srcElement.files[0];
    if (type === 'avatar') {
      this.fileContentAvatar = file;
      this.imgAvatar = window.URL.createObjectURL(file);
      this.dataForm.get('imageSrc').setValue(this.imgAvatar);
    } else {
      this.fileContentSign = file;
      this.imgSignature = window.URL.createObjectURL(file);
      this.dataForm.get('signatureSrc').setValue(this.imgSignature)
    }
  }

  getSelectorCategory() {
    this.listDanToc$ = this.storeRx.pipe(select(getCate, CategoryType.DM_DAN_TOC), takeUntil(this.ngUnsubscribe));
    this.listDanTocLoad$ = this.storeRx.pipe(select(getCateLoaded, CategoryType.DM_DAN_TOC), map(value => !value))

    this.listTonGiao$ = this.storeRx.pipe(select(getCate, CategoryType.DM_TON_GIAO), takeUntil(this.ngUnsubscribe));
    this.listTonGiaoLoad$ = this.storeRx.pipe(select(getCateLoaded, CategoryType.DM_TON_GIAO), map(value => !value))

    this.listCapDay$ = this.storeRx.pipe(select(getCate, CategoryType.DM_CAP_HOC), takeUntil(this.ngUnsubscribe));
    this.listCapDayLoad$ = this.storeRx.pipe(select(getCateLoaded, CategoryType.DM_CAP_HOC), map(value => !value))

    this.listViTriLamViec$ = this.storeRx.pipe(select(getCate, CategoryType.DM_NHOM_CAN_BO), takeUntil(this.ngUnsubscribe));
    this.listViTriLamViecLoad$ = this.storeRx.pipe(select(getCateLoaded, CategoryType.DM_NHOM_CAN_BO), map(value => !value))

    this.listChucVu$ = this.storeRx.pipe(select(getCate, CategoryType.DM_LOAI_CAN_BO), takeUntil(this.ngUnsubscribe));
    this.listChucVuLoad$ = this.storeRx.pipe(select(getCateLoaded, CategoryType.DM_LOAI_CAN_BO), map(value => !value))

    this.listMonDay$ = this.storeRx.pipe(select(getCate, CategoryType.DM_MON_HOC), takeUntil(this.ngUnsubscribe));
    this.listMonDayLoad$ = this.storeRx.pipe(select(getCateLoaded, CategoryType.DM_MON_HOC), map(value => !value))

    this.listHinhThucHopDong$ = this.storeRx.pipe(select(getCate, CategoryType.DM_HINH_THUC_HOP_DONG), takeUntil(this.ngUnsubscribe));
    this.listHinhThucHopDongLoad$ = this.storeRx.pipe(select(getCateLoaded, CategoryType.DM_HINH_THUC_HOP_DONG), map(value => !value))

    this.listGioiTinh$ = this.storeRx.pipe(select(getCate, CategoryType.DM_GIOI_TINH), takeUntil(this.ngUnsubscribe));
    this.listGioiTinhLoad$ = this.storeRx.pipe(select(getCateLoaded, CategoryType.DM_GIOI_TINH), map(value => !value))

    this.provinces$ = this.storeRx.pipe(takeUntil(this.ngUnsubscribe), select(getAllProvinces))
    this.provincesLoaded$ = this.storeRx.pipe(takeUntil(this.ngUnsubscribe), select(isProvincesLoaded))
    this.districts$ = this.storeRx.pipe(takeUntil(this.ngUnsubscribe), select(getDistrictsByProvinceCode))
    this.districtsLoaded$ = this.storeRx.pipe(takeUntil(this.ngUnsubscribe), select(isDistrictsLoaded))
    this.wards$ = this.storeRx.pipe(takeUntil(this.ngUnsubscribe), select(getWardsByDistrictCode))
    this.wardsLoaded$ = this.storeRx.pipe(takeUntil(this.ngUnsubscribe), select(isWardsLoaded))

    this.dispatchCategory();
  }

  dispatchCategory() {
    this.listDanToc$.subscribe(data => {
      if (!data) {
        this.storeRx.dispatch(new AllCategoriesRequested({categoryCode: ListCateCode.dmDanToc}))
      }
    })
    this.listTonGiao$.subscribe(data => {
      if (!data) {
        this.storeRx.dispatch(new AllCategoriesRequested({categoryCode: ListCateCode.dmTonGiao}))
      }
    })
    this.listCapDay$.subscribe(data => {
      if (!data) {
        this.storeRx.dispatch(new AllCategoriesRequested({categoryCode: ListCateCode.dmCapHoc}))
      }
    })
    this.listViTriLamViec$.subscribe(data => {
      if (!data) {
        this.storeRx.dispatch(new AllCategoriesRequested({categoryCode: ListCateCode.dmViTriLamViec}))
      }
    })
    this.listChucVu$.subscribe(data => {
      if (!data) {
        this.storeRx.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_LOAI_CAN_BO}))
      }
    })
    this.listMonDay$.subscribe(data => {
      if (!data) {
        this.storeRx.dispatch(new AllCategoriesRequested({categoryCode: ListCateCode.dmMonHoc}))
      }
    })
    this.listHinhThucHopDong$.subscribe(data => {
      if (!data) {
        this.storeRx.dispatch(new AllCategoriesRequested({categoryCode: ListCateCode.dmHinhThucHopDong}))
      }
    })
    this.listGioiTinh$.subscribe(data => {
      if (!data) {
        this.storeRx.dispatch(new AllCategoriesRequested({categoryCode: ListCateCode.dmGioiTinh}))
      }
    })

    this.provinces$.subscribe(data => {
      if (!data) {
        this.storeRx.dispatch(new GetAllProvinces())
      }
    })
  }

  cateSelected(value, name) {
    this.dataForm.get(name).setValue(value.cateName)
    if (name === 'positionStaffName') {
      this.getListJobTitle(value.cateCode)
    }
  }

  getListJobTitle(cateCode) {
    this.listJobLoading = true
    this.employeeProfileService.getJobTitle().pipe(
      finalize(() => this.listJobLoading = false)
    ).subscribe(res => {
      this.listJob = res;
      this.listJob = this.listJob.filter(fn => fn.parentCateCode === cateCode)
      this.ref.markForCheck();
    })
  }

  cateSchoolLevel(value, name) {
    this.dataForm.get(name).setValue(value.schoolLevelName)
  }

  selectSchoolFaculty(value) {
    this.dataForm.get('facultyName').setValue(value.tenBoMon)
  }

  public disabledDates = (date: Date): boolean => {
    const now = new Date();
    return date > now;
  };

  loadingEditData() {
    if (this.router.url.includes('edit-profile') && this.editData) {
      this.getListJobTitle(this.editData.positionStaffCode)
      this.getDistrict(this.editData.provinceCode, 'edit')
      this.getWards(this.editData.districtCode, 'edit')
      this.dataForm.patchValue(this.editData)
    }
  }

  ngOnInit(): void {
    this.imgSignature = this.defaultImg;
    this.imgAvatar = this.defaultImg;
    this.buildForm();
    this.getSelectorCategory();
    this.levels$ = this.storeRx.pipe(
      takeUntil(this.ngUnsubscribe),
      select(selectSchoolLevels)
    );
    this.loadingEditData();
  }
}
