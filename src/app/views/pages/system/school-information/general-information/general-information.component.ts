import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {Observable, Subject} from 'rxjs';
import {TenantModel} from '../../../../../core/service/model/tenant.model';
import {CatalogModel} from '../../../../../core/service/model/catalog.model';
import {CatalogState} from '../../../../../core/service/states/catalog.state';
import {NotiService} from '../../../../../core/service/service-model/notification.service';
import {GetAgency, GetCatalog} from '../../../../../core/service/actions/catalog.action';
import {ProvinceModel} from '../../../../../core/service/model/province.model';
import {GetDistrict} from '../../../../../core/service/actions/district.action';
import {DistrictState} from '../../../../../core/service/states/district.state';
import {DistrictModel} from '../../../../../core/service/model/district.model';
import {GetProvince} from '../../../../../core/service/actions/province.action';
import {ProvinceState} from '../../../../../core/service/states/province.state';
import {WardsModel} from '../../../../../core/service/model/wards.model';
import {WardsState} from '../../../../../core/service/states/wards.state';
import {GetWard} from '../../../../../core/service/actions/ward.action';
import {currentTenant, TenantInfo} from '../../../../../core/auth';
import {DatePipe} from '@angular/common';
import {select, Store as StoreRx} from '@ngrx/store';
import {AppState} from '../../../../../core/reducers';
import {listBinaryCapHoc} from './list-binary-cap-hoc';
import {AgencyModel} from '../../../../../core/service/model/agency.model';
import {SchoolLevel, SchoolPlaces} from '../../../../../core/auth/_models';
import {getSchoolImg} from '../../../../../core/auth/_selectors/tenant.selectors';
import {AllCategoriesRequested, Category, getCate, ListCateCode} from '../../../../../core/category';
import {Policies} from '../../../../../core/_constants/policy.constants';
import {locale} from '../../../../../core/_config/i18n/vi'

@Component({
  selector: 'kt-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.scss']
})
export class GeneralInformationComponent implements OnInit, OnDestroy {

  objOutput: {
    tenant: TenantInfo,
    isInvalid: boolean,
    save: boolean,
  }

  @Input() initGeneral: boolean;

  @Output() dataOutput = new EventEmitter();
  destroy$ = new Subject<void>();

  schoolInfoEdit = Policies.SCHOOLMANAGEMENT_SCHOOLINFOMATION_EDIT;

  VI_LANG = locale.data;

  //region Default Dropdown
  public defaultAgency: AgencyModel;
  public defaultProvince: ProvinceModel;
  public defaultLevelSchool: Category;
  public defaultTypeSchool: Category;
  public defaultTypeEdu: Category;
  public selectTypeEduDetail: Category;
  public defaultStandardCountry: Category // = {cateName: 'Lựa chọn', cateCode: ''};
  public selectStandardCountry: Category;
  public defaultArea: Category;
  public defaultDistrict: DistrictModel;
  public defaultWard: WardsModel;
  //endregion

  //region Select Store
  @Select(CatalogState.getCatalogAgency) listAgency$: Observable<AgencyModel[]>
  @Select(ProvinceState.getProvince) province$: Observable<ProvinceModel[]>
  @Select(DistrictState.getDistrict) districts$: Observable<DistrictModel[]>
  @Select(WardsState.getWard) ward$: Observable<WardsModel[]>

  tenantRx$: Observable<TenantInfo>;
  imgSchool$: Observable<string>;
  levelSchool$ : Observable<Category[]>
  listStandardCountry$: Observable<Category[]>
  listTypeSchool$: Observable<Category[]>
  listTypeEdu$: Observable<Category[]>
  listAreas$: Observable<Category[]>
  //endregion

  //region List type edu detail
  public listLoaiHinhDaoTaoHocTap = [
    {id: null, text: 'Lựa chọn'},
    {id: 1, text: 'GDTX tỉnh'},
    {id: 2, text: 'GDTX huyện'},
  ]
  //endregion

  public tenant: TenantInfo;
  public form: FormGroup;
  public value: any = [];
  public schoolLevels?: SchoolLevel[];
  public places?: SchoolPlaces[];
  public listLevel = [];
  public maxDate = new Date();
  tenantId: string;
  listcodeCapHoc: any[] = listBinaryCapHoc;
  isDateValid = true;
  urlImg: string;

  // public schoolLevel: CatalogModel;
  capHoc: number;

  constructor(private store: Store,
              private notiService: NotiService,
              private datePipe: DatePipe,
              private storeRx: StoreRx<AppState>) {
    this.form = new FormGroup({
      maDinhDanh: new FormControl({value: null, disable: true},),
      capHoc: new FormControl({value: this.defaultLevelSchool, disabled: true},),
      tenTruong: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      tenVietTat: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      diaChi: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      tenHieuTruong: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      ngayThanhLap: new FormControl(null, [Validators.required]),
      sdtHieuTruong: new FormControl(null,
        [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(50)]),
      dienThoai: new FormControl(null,
        [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(50)]),
      mucChuanQG: new FormControl(this.selectStandardCountry),
      fax: new FormControl(null, [Validators.pattern('[0-9]*'), Validators.maxLength(50)]),
      khoaHoc: new FormControl(null, [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(50)]),
      web: new FormControl(null, [Validators.maxLength(100)]),
      maSoThue: new FormControl(null, [Validators.maxLength(50)]),
      email: new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.email]),
      maTruong: new FormControl({value: null, disable: true}, []),
      coQuanChuQuan: new FormControl({value: null, disable: true}, []),
      maLoaiTruong: new FormControl({value: this.defaultTypeSchool, disabled: true}),
      maDonViQuanLy: new FormControl({value: this.defaultAgency, disabled: true},),
      maLoaiHinhDaotao: new FormControl({value: this.defaultTypeEdu, disabled: true},),
      maLoaiHinhDaoTaoChiTiet: new FormControl({value: this.selectTypeEduDetail, disabled: true}),
      maKhuVuc: new FormControl({value: this.defaultArea, disabled: true},),
      maTinh: new FormControl({value: this.defaultProvince, disabled: true},),
      maHuyen: new FormControl({value: this.defaultDistrict, disabled: true},),
      maXa: new FormControl({value: this.defaultWard, disabled: true},),
    });
    // disable input
    this.form.get('maDinhDanh').disable();
    this.form.get('maTruong').disable();
    this.form.get('coQuanChuQuan').disable();

  }

  selectState() {
    this.listTypeSchool$ = this.storeRx.pipe(select(getCate, ListCateCode.dmLoaiTruong));
    this.listTypeEdu$ = this.storeRx.pipe(select(getCate, ListCateCode.dmLoaiHinh));
    this.listAreas$ = this.storeRx.pipe(select(getCate, ListCateCode.dmKhuVuc));
    this.levelSchool$ = this.storeRx.pipe(select(getCate, ListCateCode.dmCapHoc));
    this.listStandardCountry$ = this.storeRx.pipe(select(getCate, ListCateCode.dmMucChuanQG));
    this.imgSchool$ = this.storeRx.pipe(select(getSchoolImg));
    this.tenantRx$ = this.storeRx.pipe(select(currentTenant));
  }

  ngOnInit(): void {
    document.getElementById('nameSchool').focus();
    this.selectState();
    this.tenantRx$.subscribe(value => {
      if (value) {
        this.form.patchValue({
          // capHoc: value.tenant.capHoc,
          maDinhDanh: value.identifiCode,
          tenTruong: value.name,
          tenVietTat: value.abbreviationName,
          diaChi: value.address,
          tenHieuTruong: value.principalName,
          ngayThanhLap: new Date(value.foundedDay),
          sdtHieuTruong: value.principalPhone,
          dienThoai: value.phoneNumber,
          fax: value.fax,
          khoaHoc: value.course,
          web: value.web,
          maSoThue: value.taxCode,
          email: value.email,
          maTruong: value.code,
          coQuanChuQuan: value.agency,
          maDonViQuanLy: value.managementUnitCode,
          tenDonViQuanLy: value.managementUnitName,
          maLoaiHinhDaotao: value.educationTypeCode,
          maLoaiHinhDaoTaoChiTiet: value.detailedTrainingType,
          mucChuanQG: value.standardLevel,
          maKhuVuc: value.areaCode,
          maLoaiTruong: value.typeCode,
          maTinh: value.provinceCode,
          maHuyen: value.districtCode,
          maXa: value.wardCode,

        });

        this.tenant = value;
        this.capHoc = value.level;
        this.urlImg = value.imageSrc

        // lấy tỉnh/thành phố
        this.province$.subscribe(province => {
          if ((!province || province.length === 0) && value.provinceCode) {
            this.store.dispatch(new GetProvince(value.provinceCode));
          } else {
            this.defaultProvince = province.find(item => item.provinceCode === value.provinceCode);
          }
        });

        // lấy quận/huyện
        this.districts$.subscribe(districts => {
          if ((!districts || districts.length === 0) && value.districtCode) {
            this.store.dispatch(new GetDistrict(value.districtCode));
          } else {
            this.defaultDistrict = districts.find(item => item.districtCode === value.districtCode);
          }
        });

        // lấy xã/phường
        this.ward$.subscribe(wards => {
          if ((!wards || wards.length === 0) && value.wardCode) {
            this.store.dispatch(new GetWard(value.wardCode));
          } else {
            this.defaultWard = wards.find(item => item.wardCode === value.wardCode);
          }
        });

        // lấy cấp học
        this.levelSchool$.subscribe(lvSchool => {
          if (!lvSchool) {
            this.storeRx.dispatch(new AllCategoriesRequested({categoryCode: ListCateCode.dmCapHoc}))
          } else {
            this.listLevel = lvSchool;
            this.loadDataCapHoc(this.capHoc);
          }
        })

        // đơn vị quản lý
        this.listAgency$.subscribe(agencies => {
          if (!agencies || agencies.length === 0) {
            this.store.dispatch(new GetAgency());
          } else {
            this.defaultAgency = agencies.find(agency => agency.managementUnitCode === value.managementUnitCode);
          }
        })

        // loại trường
        this.listTypeSchool$.subscribe(typeSchools => {
          if (!typeSchools) {
            this.storeRx.dispatch(new AllCategoriesRequested({categoryCode: ListCateCode.dmLoaiTruong}));
          } else {
            this.defaultTypeSchool = typeSchools.find(type => type.cateCode === value.typeCode);
          }
        })

        // Loại hình đào tạo
        this.listTypeEdu$.subscribe(typeEdu => {
          if (!typeEdu || typeEdu.length === 0) {
            this.storeRx.dispatch(new AllCategoriesRequested({categoryCode: ListCateCode.dmLoaiHinh}));
          } else {
            this.defaultTypeEdu = typeEdu.find(type => type.cateCode === value.educationTypeCode);
          }
        })

        // Loại hình đào tạo chi tiết
        // this.selectTypeEduDetail = this.listTypeEduDetail$.find(item => item.id === value.tenant.maLoaiHinhDaoTaoChiTiet.toString())

        // Mức chuẩn quốc gia
        this.listStandardCountry$.subscribe(standards => {
          if (!standards) {
            this.storeRx.dispatch(new AllCategoriesRequested({categoryCode: ListCateCode.dmMucChuanQG}) )
          } else {
            if (value.standardLevel.trim() !== '') {
              this.selectStandardCountry = standards.find(standard => standard.cateCode === value.standardLevel);
            }
          }
        })

        // Khu vực
        this.listAreas$.subscribe(areas => {
          if (!areas || areas.length === 0) {
            this.storeRx.dispatch(new AllCategoriesRequested({categoryCode: ListCateCode.dmKhuVuc}));
          } else {
            this.defaultArea = areas.find(area => area.cateCode === value.areaCode);
          }
        })
      }
    })
  }

  loadDataCapHoc(data) {
    this.value = [];
    let binaryCode = data;
    this.listcodeCapHoc.map(dt => {
      if (binaryCode !== 0 && binaryCode >= dt.code) {
        const result = binaryCode & dt.code
        if (result === dt.code) {
          const target = this.listLevel.find(fn => fn.cateCode === dt.maDanhMuc)
          this.value.push(target)
          binaryCode = binaryCode - dt.code
        }
      }
    })
  }

  trimSpace(formName: string) {
    if (formName) {
      this.form.get(formName).setValue(
        this.form.get(formName).value?.trim().replace(/(\s\s+| )/g, ' ')
      )
    }
    this.change();
  }

  validateDate() {
    this.isDateValid = new Date(this.form.value.ngayThanhLap) <= new Date();

    this.change()
  }

  clickSave() {
    this.objOutput = {
      tenant: this.tenant,
      isInvalid: this.form.invalid || !this.isDateValid,
      save: true
    }

    this.dataOutput.emit(this.objOutput);
  }

  change() {
    this.tenant = {
      agency: this.form.getRawValue().coQuanChuQuan?.replace(/(\s\s+| )/g, ' ').trim(),
      address: this.form.getRawValue().diaChi.trim().replace(/(\s\s+| )/g, ' '),
      phoneNumber: this.form.getRawValue().dienThoai.toString().trim(),
      email: this.form.getRawValue().email.trim().replace(/(\s\s+| )/g, ' '),
      fax: this.form.getRawValue().fax?.replace(/(\s\s+| )/g, ' ').trim(),
      identifiCode: this.form.getRawValue().maDinhDanh.trim(),
      course: this.form.getRawValue().khoaHoc.toString().trim().replace(/(\s\s+| )/g, ' '),
      typeCode: this.form.getRawValue().maLoaiTruong.trim(),
      taxCode: this.form.getRawValue().maSoThue?.replace(/(\s\s+| )/g, ' ').trim(),
      code: this.form.getRawValue().maTruong.trim(),
      name: this.form.getRawValue().tenTruong.trim().replace(/(\s\s+| )/g, ' '),
      level: this.capHoc,
      principalPhone: this.form.getRawValue().sdtHieuTruong.toString().trim(),
      principalName: this.form.getRawValue().tenHieuTruong.trim().replace(/(\s\s+| )/g, ' '),
      abbreviationName: this.form.getRawValue().tenVietTat.trim().replace(/(\s\s+| )/g, ' '),
      web: this.form.getRawValue().web?.replace(/(\s\s+| )/g, ' ').trim(),
      wardCode: this.form.getRawValue().maXa.trim(),
      provinceCode: this.form.getRawValue().maTinh.trim(),
      districtCode: this.form.getRawValue().maHuyen.trim(),
      areaCode: this.form.getRawValue().maKhuVuc.trim(),
      foundedDay: this.datePipe.transform(this.form.getRawValue().ngayThanhLap, 'yyyy-MM-dd'),
      managementUnitCode: this.form.getRawValue().maDonViQuanLy.trim(),
      educationTypeCode: this.form.getRawValue().maLoaiHinhDaotao.trim(),
      detailedTrainingType: Number(this.form.getRawValue().maLoaiHinhDaoTaoChiTiet),
      standardLevel: this.form.getRawValue().mucChuanQG.trim(),
      isActive: this.tenant.isActive,
      extraProperties: this.tenant.extraProperties,
      id: this.tenant.id,
      schoolPlaces: this.tenant.schoolPlaces,
      schoolLevels: this.tenant.schoolLevels,
      imageSrc: this.tenant.imageSrc,
      managementUnitName: this.defaultAgency?.managementUnitName,
    }

    this.objOutput = {
      tenant: this.tenant,
      isInvalid: this.form.invalid || !this.isDateValid,
      save: false
    }

    this.dataOutput.emit(this.objOutput);

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }


}
