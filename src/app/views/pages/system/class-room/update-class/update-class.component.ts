import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Store} from '@ngxs/store';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AddClassroom, GetClassByYear, GetNamHoc, UpdateClassroom,} from '../../../../../core/service/actions/classroom.action';
import {ClassroomState} from '../../../../../core/service/states/classroom.state';
import {ClassroomModel, ClassroomOtherModel, ExtraClass,} from '../../../../../core/service/model/classroom.model';
import {TenantModel} from '../../../../../core/service/model/tenant.model';
import {ManagermentState} from '../../../../../core/service/states/managerment.state';
import {ManagementModel} from '../../../../../core/service/model/management.model';
import {GetManagerments} from '../../../../../core/service/actions/managerment-action';
import {NotiService} from '../../../../../core/service/service-model/notification.service';
import {CheckBoxDirective} from '@progress/kendo-angular-inputs';
import {SmasContextService} from '../../../../../core/_base/layout';
import { NgUnsubscribe } from 'src/app/views/shared/directives';
import {takeUntil} from 'rxjs/operators';
import {locale} from '../../../../../core/_config/i18n/vi';
import {Place, SchoolLevel, SchoolPlaces} from 'src/app/core/auth/_models';
import {
  AllCategoriesRequested,
  Category,
  getCate,
  GetCategoriesWithParent,
  getCateWithParent,
  ListCateCode
} from '../../../../../core/category';
import {Store as StoreRx,select} from '@ngrx/store';
import {AppState} from '../../../../../core/reducers';
import {getFullSchoolPlace, selectSchoolPlaces} from '../../../../../core/auth/_selectors/tenant.selectors';
import {DropDownListComponent} from '@progress/kendo-angular-dropdowns';
import { Year } from 'src/app/core/year';

@Component({
  selector: 'kt-update-class',
  templateUrl: './update-class.component.html',
  styleUrls: ['./update-class.component.scss'],
})
export class UpdateClassComponent extends NgUnsubscribe implements OnInit, OnDestroy, AfterViewInit {
  VI_LANG = locale.data;
  // nếu trong store có dữ liệu đã call api rồi thì kh call api mà lấy trực tiếp trong store
  listSchool$: Observable<SchoolPlaces[]>;
  camBo$: Observable<ManagementModel[]>;
  ngoaiNgu$: Observable<Category[]>;
  lopGhep$: Observable<Category[]>; // chưa dùng
  kieuLop$: Observable<Category[]>;
  SBHTT$: Observable<Category[]>;
  HNDN$: Observable<Category[]>;
  HTDT$: Observable<Category[]>;
  LDTBD$: Observable<Category[]>;
  STHNN$: Observable<Category[]>;
  BSGK$: Observable<Category[]>;
  otherClassroom$: Observable<Category[]>;
  otherClassroom: ClassroomOtherModel[];
  extraClassroom: string[] = [];
  listClassroom$: Observable<ClassroomModel[]>;
  // loading
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loadingEdit$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loadingGrade$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loadingLoaiLop$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loadingBSGK$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loadingSBH$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loadingHNDN$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loadingHTHT$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loadingCTDTBD$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loadingNN$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  destroy$ = new Subject<void>();
  disableAdd = false;
  // check add confirm
  checkKhoiHoc = false;
  checkTenLop = false;
  checkHocBuoi = false;
  checkLoaiLop = false;
  checkNgoaiNgu = false;
  // checkbox
  check1: any;
  check2: any;
  check3: any;
  check4: any;
  check5: any;
  check6: any;
  check7: any;
  hocSangChinh = false;
  hocChieuChinh = false;
  hocToiChinh = false;
  hocsang = false;
  hocchieu = false;
  hoctoi = false;
  lopGhep = false;
  checkDisableLoaiLop = false;
  // disable follow Ngoại Ngữ
  tenant: TenantModel;
  public dataListManagerment: ManagementModel[] = [];
  public dataList: ManagementModel[] = [];
  public bool = 0;
  public indexOfManagermentName = 0;
  public default: { cateCode: string; cateName: string } = {
    cateCode: null,
    cateName: 'Lựa chọn',
  };
  public default$: { cateCode: string; cateName: string } = {
    cateCode: null,
    cateName: 'Lựa chọn',
  };
  public defaultshool: { id: string; schoolPlaceName: string } = {
    id: null,
    schoolPlaceName: 'Lựa chọn',
  };
  public chuongTrinhNgoaiNgu = [
    {cateName: '10 năm', cateCode: 0},
    {cateName: '7 năm', cateCode: 1},
    {cateName: 'Khác', cateCode: 2},
  ];
  dataEditClassroom: ClassroomModel;

  isAddNew: boolean;
  // đóng mở dialog
  @Input() openeddialog: boolean;
  @Output() closedialog = new EventEmitter();

  // gửi và nhận dữ liệu component classroom
  @Input() dataEdit: ClassroomModel;
  @Input() title: string;
  @Input() dataKhoi$: Observable<Category[]>;
  @Input() namHoc$: Year;
  @Input() schoolLevel: SchoolLevel;
  @ViewChild('resetCheckbox') resetCheckbox: CheckBoxDirective;
  @ViewChild('resetNgoaiNgu1') resetNgoaiNgu1: DropDownListComponent;
  @ViewChild('resetNgoaiNgu2') resetNgoaiNgu2: DropDownListComponent;
  @ViewChild('resetNN1') resetNN1: DropDownListComponent;
  @ViewChild('resetNN2') resetNN2: DropDownListComponent;
  @ViewChild('tenlopinput') tenlop: ElementRef;
// formGroup get and set data
  public formGroup: FormGroup = new FormGroup({
    id: new FormControl(null, []),
    // tenantId: new FormControl('', []),
    schoolYearId: new FormControl(null, []),
    schoolYearCode: new FormControl(null, []),
    gradeLevel: new FormControl(null, []),
    gradeLevelCode: new FormControl(null, [Validators.required]),
    className: new FormControl('', [
      Validators.required,
      Validators.maxLength(50), Validators.pattern('[^~`!@#$%^&*()_=[{}\\]|:;\\\\"\'<+>.?/]*')
    ]),
    teacherName: new FormControl(null, []),
    teacherId: new FormControl(null, []),
    description: new FormControl(null, [Validators.maxLength(200)]),
    hasMorningStudy: new FormControl(false, []),
    hasAfternoolStudy: new FormControl(false, []),
    hasEveningStudy: new FormControl(false, []),
    isMainMorningStudy: new FormControl(false, []),
    isMainAfternoolStudy: new FormControl(false, []),
    isMainEveningStudy: new FormControl(false, []),
    isCompoundClass: new FormControl(false, []),
    compoundClassCode: new FormControl('', [Validators.maxLength(50), Validators.pattern('[^~`!@#$%^&*()_=[{}\\]|:;\\\\"\'<+>.?/]*')]),
    classCodeType: new FormControl(null, []),
    schoolPlaceId: new FormControl(null, []),
    textBookSetCode: new FormControl(null, []),
    lessonOfWeekCode: new FormControl(null, []),
    vocationalTrainingGuideCode: new FormControl(null, []),
    learnModeCode: new FormControl(null, []),
    fosteringTrainingProgramCode: new FormControl(null, []),
    foreignLanguage1Code: new FormControl(null, []),
    foreignLanguage2Code: new FormControl(null, []),
    foreignLanguageProgram1Code: new FormControl('', []),
    foreignLanguageProgram2Code: new FormControl('', []),
    foreignLanguageLesson1Code: new FormControl('', []),
    foreignLanguageLesson2Code: new FormControl('', []),
  })

  constructor(private modal: NgbModal,
              private ActiveModal: NgbActiveModal,
              private store: Store,
              private storeRx: StoreRx<AppState>,
              private notiService: NotiService,
              private smasContextService: SmasContextService) {
    super();
  }

// set disable và enable dầu vào add và edit
  SetDisable() {
    this.formGroup.controls.schoolYearId.disable();
    this.formGroup.controls.compoundClassCode.disable();
    this.formGroup.controls.isMainMorningStudy.disable();
    this.formGroup.controls.isMainAfternoolStudy.disable();
    this.formGroup.controls.isMainEveningStudy.disable();
    this.formGroup.controls.foreignLanguageProgram1Code.disable();
    this.formGroup.controls.foreignLanguageLesson1Code.disable();
    this.formGroup.controls.foreignLanguageProgram2Code.disable();
    this.formGroup.controls.foreignLanguageLesson2Code.disable();
    this.formGroup.controls.classCodeType.disable();
    // @ts-ignore
    if (this.dataEdit.isCompoundClass === true) {
      this.formGroup.controls.compoundClassCode.enable();
      this.formGroup.value.compoundClassCode = this.dataEdit.compoundClassCode;
    }
    // @ts-ignore
    if (this.dataEdit.hasMorningStudy === true) {
      this.formGroup.controls.isMainMorningStudy.enable();
    }
    // @ts-ignore
    if (this.dataEdit.hasAfternoolStudy === true) {
      this.formGroup.controls.isMainAfternoolStudy.enable();
    }
    // @ts-ignore
    if (this.dataEdit.hasEveningStudy === true) {
      this.formGroup.controls.isMainEveningStudy.enable();
    }
    if (this.formGroup.value.foreignLanguage1Code != null) {
      this.formGroup.controls.foreignLanguageProgram1Code.enable();
      this.formGroup.controls.foreignLanguageLesson1Code.enable();
    }
    if (this.formGroup.value.foreignLanguage2Code !== null) {
      this.formGroup.controls.foreignLanguageProgram2Code.enable();
      this.formGroup.controls.foreignLanguageLesson2Code.enable();
    }
  }

// call service năm học and cấp học
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.ngoaiNgu$ = this.storeRx.pipe(select(getCate, ListCateCode.dmNgoaiNgu));
    this.kieuLop$ = this.storeRx.pipe(select(getCate, ListCateCode.dmKieuLop));
    this.SBHTT$ = this.storeRx.pipe(select(getCate, ListCateCode.dmSoBuoiHocTrenTuan));
    this.HNDN$ = this.storeRx.pipe(select(getCate, ListCateCode.dmHuongNghiepDayNghe));
    this.HTDT$ = this.storeRx.pipe(select(getCate, ListCateCode.dmHinhThucDaoTao));
    this.LDTBD$ = this.storeRx.pipe(select(getCate, ListCateCode.dmLopDaoTaoBoiDuong));
    this.STHNN$ = this.storeRx.pipe(select(getCate, ListCateCode.dmTietHocNgoaiNgu));
    this.BSGK$ = this.storeRx.pipe(select(getCate, ListCateCode.dmBoSachGiaoKhoa));
    this.otherClassroom$ = this.storeRx.pipe(select(getCate, ListCateCode.dmTinhChatKhac));
    this.dataKhoi$ = this.storeRx.pipe(select(getCateWithParent, ListCateCode.dmKhoi));
    this.listSchool$ = this.storeRx.pipe(select(getFullSchoolPlace));
    this.SetApiClassRoom();
    // data trả về add and edit classroom
    if (this.dataEdit === undefined) {
      // tslint:disable-next-line:new-parens
      this.dataEdit = new ClassroomModel();
      this.dataEdit.extraProperties = new ExtraClass();

      this.isAddNew = true;
    } else {
      this.formGroup.value.schoolYearId = this.dataEdit.schoolYearId;
      this.hocsang = this.dataEdit.hasMorningStudy;
      this.hocchieu = this.dataEdit.hasAfternoolStudy;
      this.hoctoi = this.dataEdit.hasEveningStudy;
      this.hocSangChinh = this.dataEdit.isMainMorningStudy;
      this.hocChieuChinh = this.dataEdit.isMainAfternoolStudy;
      this.hocToiChinh = this.dataEdit.isMainEveningStudy;
      this.setBuoiHoc();

      if (!this.dataEdit.extraProperties) {
        this.dataEdit.extraProperties = new ExtraClass();
      } else {
        this.extraClassroom = this.dataEdit.extraProperties.extra;
      }
    }
    this.getListOtherClassRoom();
    // gán giá trị add
    if (!this.isAddNew) {
      this.formGroup.patchValue({
        id: this.dataEdit.id,
        tenantId: this.dataEdit.tenantId,
        schoolYearId: this.dataEdit.schoolYearId,
        gradeLevelCode: this.dataEdit.gradeLevelCode,
        className: this.dataEdit.className,
        teacherName: this.dataEdit.teacherName,
        teacherId: this.dataEdit.teacherId,
        description: this.dataEdit.description,
        hasMorningStudy: this.dataEdit.hasMorningStudy,
        hasAfternoolStudy: this.dataEdit.hasAfternoolStudy,
        hasEveningStudy: this.dataEdit.hasEveningStudy,
        isMainMorningStudy: this.dataEdit.isMainMorningStudy,
        isMainAfternoolStudy: this.dataEdit.isMainAfternoolStudy,
        isMainEveningStudy: this.dataEdit.isMainEveningStudy,
        isCompoundClass: this.dataEdit.isCompoundClass,
        compoundClassCode: this.dataEdit.compoundClassCode,
        classCodeType: this.dataEdit.classCodeType,
        schoolPlaceId: this.dataEdit.schoolPlaceId,
        textBookSetCode: this.dataEdit.textBookSetCode,
        lessonOfWeekCode: this.dataEdit.lessonOfWeekCode,
        vocationalTrainingGuideCode: this.dataEdit.vocationalTrainingGuideCode,
        learnModeCode: this.dataEdit.learnModeCode,
        fosteringTrainingProgramCode: this.dataEdit.fosteringTrainingProgramCode,
        foreignLanguage1Code: this.dataEdit.foreignLanguage1Code,
        foreignLanguage2Code: this.dataEdit.foreignLanguage2Code,
        foreignLanguageProgram1Code: this.dataEdit.foreignLanguageProgram1Code,
        foreignLanguageProgram2Code: this.dataEdit.foreignLanguageProgram2Code,
        foreignLanguageLesson1Code: this.dataEdit.foreignLanguageLesson1Code,
        foreignLanguageLesson2Code: this.dataEdit.foreignLanguageLesson2Code,
      });
    }
    this.dataEditClassroom = this.dataEdit
    // checkbox thông tin khác

    this.SetDisable();
    if (this.dataEdit.classCodeType || (this.schoolLevel.schoolLevelCode === '05')) {
      this.formGroup.controls.classCodeType.enable();
      this.checkDisableLoaiLop = true;
    } else {
      this.formGroup.controls.classCodeType.disable();
      this.checkDisableLoaiLop = false;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.tenlop.nativeElement.select();
      this.tenlop.nativeElement.focus();
    }, 10)
  }

  // array api
  SetApiClassRoom() {
    this.getListOtherClassRoom();
    this.getListClassRoom();
    // this.getListNamHoc();
    this.getListCanBo();
    this.getListNgoaiNgu();
    this.getListBSGK();
    this.getListKieuLop();
    this.getListSBHTT();
    this.getListHNDN();
    this.getListHTDT();
    this.getListLDTBD();
    this.getListSTHNN();
    // this.getListLopGhep();
  }

  // call api
// call api lớp học để check trùng
  getListClassRoom() {
    this.store.dispatch(new GetClassByYear(this.namHoc$.id));
    this.listClassroom$ = this.store.select(ClassroomState.getClassByYear);
  }
// call giáo viên chủ nhiêm
  getListCanBo() {
    this.store.dispatch(new GetManagerments());
    this.camBo$ = this.store.select(ManagermentState.manager)
    this.camBo$.subscribe(canbo => {
      this.dataList = canbo;
      this.dataListManagerment = this.dataList;
    });
  }

// call api list ngoại ngữ
  getListNgoaiNgu() {
    this.ngoaiNgu$.subscribe((data) => {
      if (!data) {
        this.loadingNN$.next(true);
        this.storeRx.dispatch(new AllCategoriesRequested({categoryCode: ListCateCode.dmNgoaiNgu}));
      } else {
        this.loadingNN$.next(false);
      }
    })
  }

// call api lớp ghép (chưa sửa dụng)
  getListLopGhep() {
    this.lopGhep$.subscribe((data) => {
      if (!data) {
        this.storeRx.dispatch(new AllCategoriesRequested({categoryCode: ListCateCode.dmLopGhep}));
      }
    })
  }

// call api kiểu lớp - loại lớp
  getListKieuLop() {
    this.kieuLop$.subscribe((data) => {
      if (!data) {
        this.loadingLoaiLop$.next(true);
        this.storeRx.dispatch(new AllCategoriesRequested({categoryCode: ListCateCode.dmKieuLop}));
      } else {
        this.loadingLoaiLop$.next(false);
      }
    })
  }

// call api số buổi học trên tuần
  getListSBHTT() {
    this.SBHTT$.subscribe((data) => {
      if (!data) {
        this.loadingSBH$.next(true);
        this.storeRx.dispatch(new AllCategoriesRequested({categoryCode: ListCateCode.dmSoBuoiHocTrenTuan}));
      } else {
        this.loadingSBH$.next(false);
      }
    })
  }

// call api hướng nghiệp dậy nghề
  getListHNDN() {
    this.HNDN$.subscribe((data) => {
      if (!data) {
        this.loadingHNDN$.next(true);
        this.storeRx.dispatch(new AllCategoriesRequested({categoryCode: ListCateCode.dmHuongNghiepDayNghe}));
      } else {
        this.loadingHNDN$.next(false);
      }
    })
  }

// call api hình thức đào tạo
  getListHTDT() {
    this.HTDT$.subscribe((data) => {
      if (!data) {
        this.loadingHTHT$.next(true);
        this.storeRx.dispatch(new AllCategoriesRequested({categoryCode: ListCateCode.dmHinhThucDaoTao}));
      } else {
        this.loadingHTHT$.next(false);
      }
    })
  }

// call api loại hình đào tạo bồi dưỡng
  getListLDTBD() {
    this.LDTBD$.subscribe((data) => {
      if (!data) {
        this.loadingCTDTBD$.next(true);
        this.storeRx.dispatch(new AllCategoriesRequested({categoryCode: ListCateCode.dmLopDaoTaoBoiDuong}));
      } else {
        this.loadingCTDTBD$.next(false);
      }
    })
  }

// call api số tiết học ngoại ngữ
  getListSTHNN() {
    this.STHNN$.subscribe((data) => {
      if (!data) {
        this.storeRx.dispatch(new AllCategoriesRequested({categoryCode: ListCateCode.dmTietHocNgoaiNgu}));
      }
    })
  }

// call api bộ sách giáo khoa
  getListBSGK() {
    this.BSGK$.subscribe((data) => {
      if (!data) {
        this.storeRx.dispatch(new AllCategoriesRequested({categoryCode: ListCateCode.dmBoSachGiaoKhoa}));
        this.loadingBSGK$.next(true);
      } else {
        this.loadingBSGK$.next(false);
      }
    })
  }

// call api list thông tin khác
  getListOtherClassRoom() {
    this.otherClassroom$.subscribe((data) => {
      if (!data) {
        this.storeRx.dispatch(new AllCategoriesRequested({categoryCode: ListCateCode.dmTinhChatKhac}));
      } else {
        this.otherClassroom = data.map(item => {
          if (this.extraClassroom.includes(item.cateCode)) {
            return new ClassroomOtherModel(item.cateCode, item.cateName, true);
          } else {
            return new ClassroomOtherModel(item.cateCode, item.cateName, false);
          }
        })
      }
    })
  }

  // đóng add and edit classroom
  public close() {
    this.ActiveModal.dismiss();
  }

  // set boleen
// set buổi học
  setBuoiHoc() {
    // @ts-ignore
    if (this.dataEdit.hasMorningStudy === true) {
      this.hocsang = true
    } else this.hocsang = false;
    // @ts-ignore
    if (this.dataEdit.hasAfternoolStudy === true) {
      this.hocchieu = true
    } else this.hocchieu = false;
    // @ts-ignore
    if (this.dataEdit.hasEveningStudy === true) {
      this.hoctoi = true;
    } else this.hoctoi = false;
    // @ts-ignore
    if (this.dataEdit.isMainMorningStudy === true) {
      this.hocSangChinh = true;
    } else this.hocSangChinh = false;
    // @ts-ignore
    if (this.dataEdit.isMainAfternoolStudy === true) {
      this.hocChieuChinh = true;
    } else this.hocChieuChinh = false;
    // @ts-ignore
    if (this.dataEdit.isMainEveningStudy === true) {
      this.hocToiChinh = true;
    } else this.hocToiChinh = false;
  }

  // addclassroom call api
  add() {
    this.dataEdit = this.formGroup.value;
    // check các trường còn trống và hiện thông báo
    this.formGroup.markAllAsTouched();
    // check khối học
    if (!this.dataEdit.gradeLevelCode) {
      this.checkKhoiHoc = true;
    } else {
      this.checkKhoiHoc = false;
    }
    // check tên lớp
    if (this.dataEdit.className === null) {
      this.checkTenLop = true;
    } else {
      this.checkTenLop = false;
    }
    // check buổi học
    if ((this.hocsang !== true && this.hocchieu !== true && this.hoctoi !== true) ||
      (this.hocSangChinh !== true && this.hocChieuChinh !== true && this.hocToiChinh !== true)) {
      this.checkHocBuoi = true;
    } else {
      this.checkHocBuoi = false;
    }
    // if (this.dataEdit.maLoaiLop === null) {
    //   this.checkLoaiLop = true;
    // } else {
    //   this.checkLoaiLop = false;
    // }
    // check trùng ngoại ngữ 1 và ngoại ngữ 2
    if (
      this.dataEdit.foreignLanguage1Code != null &&
      this.dataEdit.foreignLanguage2Code != null &&
      this.dataEdit.foreignLanguage1Code === this.dataEdit.foreignLanguage2Code
    ) {
      this.checkNgoaiNgu = true;
    } else {
      this.checkNgoaiNgu = false;
    }
    // call api add
    // check form nhập
    if (
      this.checkKhoiHoc === false &&
      this.checkTenLop === false &&
      this.checkHocBuoi === false &&
      this.checkNgoaiNgu === false
    ) {
      if (!this.formGroup.valid) {
        this.notiService.fillFullInfoWarning();
      } else {
        // kiểm tra xem là thêm mới hay là cập nhập lớp học
        if (this.dataEdit.id === null || this.dataEdit.id === undefined) {
          this.loadingEdit$.next(true);
          this.formGroup.value.schoolYearCode = this.namHoc$.code;
          this.formGroup.value.schoolYearId = this.namHoc$.id;
          if(this.formGroup.value.gradeLevelCode){
            let e: Category[];
            this.dataKhoi$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(data=>{
              e = (data.filter(datas => datas.cateCode === this.formGroup.value.gradeLevelCode));
            })
            this.formGroup.value.gradeLevel = e[0].cateName;
          }
          if (!this.dataEdit.extraProperties) {
            this.dataEdit.extraProperties = new ExtraClass();
          }
          this.dataEdit.extraProperties.extra = this.extraClassroom;
          if (this.checkTrung() === null) {
            // sau khi thực hiện click thì disable nút add
            this.store
              .dispatch(new AddClassroom(this.dataEdit))
              .toPromise()
              .then((result) => {
                this.notiService.createSuccess();
                this.ActiveModal.close();
                this.loadingEdit$.next(false);
              })
              .catch((error) => {
                this.loadingEdit$.next(false);
                this.notiService.showNoti(error.error.error.message, 'error');
                // this.notiService.removeNoti(1)
              });
          } else {
            this.loadingEdit$.next(false);
            this.notiService.showNoti(
              'Tên lớp ' + this.checkTrung() + ' trùng',
              'error'
            );
          }
        } else {
          this.loadingEdit$.next(true);
          this.formGroup.value.schoolYearCode = this.namHoc$.code;
          this.formGroup.value.schoolYearId = this.namHoc$.id;
          if(this.formGroup.value.gradeLevelCode){
            let e: Category[];
            this.dataKhoi$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(data=>{
              e = (data.filter(datas => datas.cateCode === this.formGroup.value.gradeLevelCode));
            })
            this.formGroup.value.gradeLevel = e[0].cateName;
          }
          this.dataEditClassroom = this.formGroup.value;
          this.dataEditClassroom.schoolYearId = this.formGroup.value.schoolYearId;
          if (!this.dataEditClassroom.extraProperties) {
            this.dataEditClassroom.extraProperties = new ExtraClass();
          }
          this.dataEditClassroom.extraProperties.extra = this.extraClassroom;
          // sau khi thực hiện click thì disable nút add
          this.store.dispatch(new UpdateClassroom(this.dataEdit.id, this.dataEditClassroom))
            .toPromise().then((res) => {
            this.ActiveModal.close();
            this.loadingEdit$.next(false);
          }).catch((error)  => {
            this.loadingEdit$.next(false);
            // this.notiService.showNoti(error.error.error.message,'error');
          });
        }
      }
    } else {
      this.notiService.fillFullInfoWarning();
    }
  }

// nếu trong trường tên lớp có 2 lớp cùng tên nhau thì trả ra tên lớp trùng.
  // nếu kh có lớp nào trùng thì trả ra null hàm add bắt null thực hiện call api
  checkTrung() {
    if (this.dataEdit.className !== null) {
      const arrayLop = this.dataEdit.className.split(',');
      for (let i = 0; i < arrayLop.length; i++) {
        const checkTrungFrontend = arrayLop[i].trim();
        if (arrayLop.length > 1) {
          for (let j = i + 1; j < arrayLop.length; j++) {
            if (checkTrungFrontend.toLowerCase() === arrayLop[j].trim().toLowerCase() && checkTrungFrontend !== '') {
              return checkTrungFrontend;
            }
          }
        }
      }
      const a = null;
      // this.listClassroom$.subscribe((data) => {
      //   arrayLop.forEach((x) => {
      //     const checkTrungFrontendbyClass = data.find(
      //       (item: ClassroomModel) => item.tenLop.trim() === x.trim()
      //     );
      //     if (
      //       checkTrungFrontendbyClass !== null &&
      //       checkTrungFrontendbyClass !== undefined
      //     ) {
      //       a = x;
      //     }
      //   });
      // });
      return a;
    }
  }

// thay đổi dữ liệu enable nút add (không dùng)
  changeCheckAddClassRoom() {
    this.disableAdd = false;
    this.dataEdit = this.formGroup.value;
  }

// trim() mã lớp ghép
  formatMaLopGhep() {
    let note = ''
    if (this.formGroup.value.compoundClassCode) {
      note = this.formGroup.value.compoundClassCode.trim();
    }
    this.formGroup.patchValue({
      compoundClassCode: note
    })
  }

// trim() mô tả
  formatMoTa() {
    let note = ''
    if (this.formGroup.value.description) {
      note = this.formGroup.value.description.trim();
    }
    this.formGroup.patchValue({
      description: note
    })
  }

// trim +  xóa space tên lớp
  formatTenLop() {
    let note = ''
    if (this.formGroup.value.className) {
      note = this.formGroup.value.className.trim();
      note = note.replace(/\s/g, '');
    }
    this.formGroup.patchValue({
      className: note
    })
  }

// check khối học không được để trống
  changeKhoi() {
    this.disableAdd = false;
    this.dataEdit = this.formGroup.value;
    if (this.dataEdit.gradeLevelCode === null) {
      this.checkKhoiHoc = true;
    } else {
      this.checkKhoiHoc = false;
    }
  }

// check loại lớp là giáo dục thường xuyện thì enable
  changeLoaiLop() {
    this.disableAdd = false;
    this.dataEdit = this.formGroup.value;
    if (this.dataEdit.classCodeType === null && this.schoolLevel.schoolLevelCode === '05') {
      this.checkLoaiLop = true;
    } else {
      this.checkLoaiLop = false;
    }
  }

  // checkbox
  checkHocsang() {
    this.disableAdd = false;
    this.check1 = document.getElementById('hocsang');
    this.hocsang = this.check1.checked;
    if (this.hocsang === false) {
      this.hocSangChinh = false;
      this.formGroup.controls.isMainMorningStudy.disable();
      this.dataEdit.hasMorningStudy = false;
      this.dataEdit.isMainMorningStudy = false;
    } else {
      this.dataEdit.hasMorningStudy = true;
      this.hocSangChinh = false;
      this.formGroup.controls.isMainMorningStudy.enable();
      this.formGroup.controls.isMainMorningStudy.setValue(false);
    }
    this.dataEdit = this.formGroup.value;
  }

  checkHocchieu() {
    this.disableAdd = false;
    this.check2 = document.getElementById('hocchieu');
    this.hocchieu = this.check2.checked;
    if (this.hocchieu === false) {
      this.hocChieuChinh = false;
      this.formGroup.controls.isMainAfternoolStudy.disable();
      this.dataEdit.hasAfternoolStudy = false;
      this.dataEdit.isMainAfternoolStudy = false;
    } else {
      this.formGroup.controls.isMainAfternoolStudy.enable();
      this.dataEdit.hasAfternoolStudy = true;
      this.formGroup.controls.isMainAfternoolStudy.setValue(false);
    }
  }

  checkHoctoi() {
    this.disableAdd = false;
    this.check3 = document.getElementById('hoctoi');
    this.hoctoi = this.check3.checked;
    if (this.hoctoi === false) {
      this.hocToiChinh = false;
      this.formGroup.controls.isMainEveningStudy.disable();
      this.dataEdit.hasEveningStudy = false;
      this.dataEdit.isMainEveningStudy = false;
    } else {
      this.formGroup.controls.isMainEveningStudy.enable();
      this.dataEdit.hasEveningStudy = true;
      this.formGroup.controls.isMainEveningStudy.setValue(false);

    }
  }

  checkHocchinhsang() {
    this.disableAdd = false;
    this.check4 = document.getElementById('hocSangChinh');
    this.hocSangChinh = this.check4.checked;
    this.dataEdit = this.formGroup.value;
    if (this.hocSangChinh === false) {
      this.dataEdit.isMainMorningStudy = false;
    } else {
      this.dataEdit.isMainMorningStudy = true;
      this.checkHocBuoi = false;
    }
  }

  checkHocchinhchieu() {
    this.disableAdd = false;
    this.check5 = document.getElementById('hocChieuChinh');
    this.hocChieuChinh = this.check5.checked;
    if (this.hocChieuChinh === false) {
      this.dataEdit.isMainAfternoolStudy = false;
    } else {
      this.dataEdit.isMainAfternoolStudy = true;
      this.checkHocBuoi = false;
    }
  }

  checkHocchinhtoi() {
    this.disableAdd = false;
    this.check6 = document.getElementById('hocToiChinh');
    this.hocToiChinh = this.check6.checked;
    if (this.hocToiChinh === false) {
      this.dataEdit.isMainEveningStudy = false;
    } else {
      this.dataEdit.isMainEveningStudy = true;
      this.checkHocBuoi = false;
    }
  }

  checklopghep() {
    this.disableAdd = false;
    this.check7 = document.getElementById('lopGhep');
    this.lopGhep = this.check7.checked;
    this.dataEdit = this.formGroup.value;
    if (this.lopGhep === true) {
      this.formGroup.controls.compoundClassCode.enable();
    } else {
      this.formGroup.controls.compoundClassCode.disable();
    }
  }

// dropdown ngoại ngữ
  changecheckNgoaiNgu1(value) {
    if (!value) {
      this.resetNgoaiNgu1.reset();
      this.resetNN1.reset();
      this.formGroup.controls.foreignLanguageProgram1Code.disable();
      this.formGroup.controls.foreignLanguageLesson1Code.disable();
      this.formGroup.value.foreignLanguageProgram1Code = null;
      this.formGroup.value.foreignLanguageLesson1Code = null;
    } else {
      this.formGroup.controls.foreignLanguageProgram1Code.enable();
      this.formGroup.controls.foreignLanguageLesson1Code.enable();
    }
    this.disableAdd = false;
    this.dataEdit = this.formGroup.value;
    if (
      this.dataEdit.foreignLanguage1Code != null &&
      this.dataEdit.foreignLanguage2Code != null &&
      this.dataEdit.foreignLanguage1Code === this.dataEdit.foreignLanguage2Code
    ) {
      this.checkNgoaiNgu = true;
    } else {
      this.checkNgoaiNgu = false;
    }
  }

  changecheckNgoaiNgu2(value) {
    if (!value) {
      this.resetNgoaiNgu2.reset();
      this.resetNN2.reset();
      this.formGroup.controls.foreignLanguageProgram2Code.disable();
      this.formGroup.controls.foreignLanguageLesson2Code.disable();
      this.formGroup.value.foreignLanguageProgram2Code = null;
      this.formGroup.value.foreignLanguageLesson2Code = null;

    } else {
      this.formGroup.controls.foreignLanguageProgram2Code.enable();
      this.formGroup.controls.foreignLanguageLesson2Code.enable();
    }
    this.disableAdd = false;
    this.dataEdit = this.formGroup.value;
    if (
      this.dataEdit.foreignLanguage1Code != null &&
      this.dataEdit.foreignLanguage2Code != null &&
      this.dataEdit.foreignLanguage1Code === this.dataEdit.foreignLanguage2Code
    ) {
      this.checkNgoaiNgu = true;
    } else {
      this.checkNgoaiNgu = false;
    }
  }

// Thông tin khác
  changeCheckInformation(value) {
    this.disableAdd = false;
    if (value.status) {
      this.extraClassroom.push(value.cateCode);
    } else {
      this.extraClassroom = this.extraClassroom.filter(item => item !== value.cateCode);
    }
  }

// giao viên
  findGVBykey(value) {
    if (value.length > 0) {
      this.dataListManagerment = [];
      this.dataList.forEach((item) => {
        if (
          item.fullName.toLowerCase().indexOf(value.trim().toLowerCase()) !== -1
        ) {
          this.dataListManagerment.push(item);
        }
      });
    }
  }

  checkValue() {
    const index = this.dataList.findIndex(
      (item) => item.id === this.formGroup.value.teacherId
    );
    if (
      index === -1 ||
      this.formGroup.value.teacherId === undefined ||
      this.bool === 0
    ) {
      this.formGroup.patchValue({
        teacherId: null,
        teacherName: null,
      });
    }
    this.disableAdd = false;
    this.dataEdit = this.formGroup.value;
  }

  keyUp(value) {
    if (value.key === 'ArrowUp' && this.indexOfManagermentName > 0) {
      this.indexOfManagermentName = this.indexOfManagermentName - 1;
    } else if (
      value.key === 'ArrowDown' &&
      this.indexOfManagermentName < this.dataListManagerment.length - 1
    ) {
      this.indexOfManagermentName = this.indexOfManagermentName + 1;
    } else if (value.key === 'Enter') {
      this.formGroup.patchValue({
        teacherName: this.dataListManagerment[this.indexOfManagermentName].fullName,
        teacherId: this.dataListManagerment[this.indexOfManagermentName].id,
      });
      this.bool = 1;
      this.indexOfManagermentName = 0;
    } else if (value.key !== 'Tab') {
      this.bool = 0;
    }
    this.disableAdd = false;
    this.dataEdit = this.formGroup.value;
  }

// trim() input
  chooseValue(value: any) {
    this.formGroup.patchValue({
      teacherName: value.hoTen,
      teacherId: value.id,
    });
    this.bool = 1;
    this.indexOfManagermentName = this.dataListManagerment.findIndex(
      (item) => item.id === value.id
    );
    this.disableAdd = false;
    this.dataEdit = this.formGroup.value;
  }
}
