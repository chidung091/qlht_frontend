import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { formatDate, Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { AllCategoriesRequested, Category, getCate, GetCategoriesWithParent, getCateWithParent, getCateWithParentLoaded } from 'src/app/core/category';
import { CategoryType } from 'src/app/core/_constants';
import { NgUnsubscribe } from 'src/app/views/shared/directives';
import { BloodGroup, EnnrolmentType, FamilyType } from './student';
import { ApiStudentService } from '../../../service-student/api-student.service';
import { ToastrService } from 'ngx-toastr';
import { SmasContextService } from 'src/app/core/_base/layout';
import { SmasConText } from 'src/app/core/_base/layout/models/smas-context.model';
import { CommonStore } from 'src/app/core/common';

@Component({
  selector: 'kt-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss']
})
export class AddProfileComponent extends CommonStore implements OnInit {

  FormAddStudent: FormGroup;
  isInformation: boolean = false;
  isPersonal: boolean = false;
  isFamily: boolean = false;
  imgsrc = "../../../../../../../assets/media/users/default.jpg";
  isloading = false;
  isloadingClass = false;
  submitted = false;
  dsClass = [];
  dataFilter: SmasConText;
  ListBlockCodeLoaded$: Observable<boolean>;
  ListEnrolmentType = EnnrolmentType; //Hình thức xét tuyển
  ListBloodGroup = BloodGroup; //Nhóm máu
  ListFamilyType = FamilyType; //Thành phần gia đình
  ListStatusCode$: Observable<Category[]> //Mã trạng thái học sinh
  defaultListData = { cateName: 'Lựa chọn', id: null };
  defaultListClass = { className: 'Lựa chọn', id: null };
  ListBlockCode$: Observable<Category[]> //Khối
  ListGender$: Observable<Category[]> //Giớ tính
  ListEthnicCode$: Observable<Category[]> //Dân tộc
  ListAreaCode$: Observable<Category[]> //Khu vực
  ListPoorAreaCode$: Observable<Category[]> //Vùng khó khăn
  ListPolicyObjectCode$: Observable<Category[]> //Đối tượng chính sách
  ListDisabilityTypeCode$: Observable<Category[]> //Loại khuyết tật
  NumberLessionPerWeekCode$: Observable<Category[]> //số buổi học trên tuần

  constructor(
    public domFile: DomSanitizer,
    private fb: FormBuilder,
    public store: Store,
    private _location: Location,
    private api: ApiStudentService,
    private toastr: ToastrService,
    private smasContextService: SmasContextService,
    private cdRef: ChangeDetectorRef,
    ) {
    super(store);
    this.smasContextService.onConfigUpdated$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.dataFilter = this.smasContextService.getSmasConText();
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.getStore();
  }

  initForm() {
    this.FormAddStudent = this.fb.group({
      BlockCode: new FormControl('', [Validators.required]),
      ClassId: new FormControl({ value: '', disabled: true }),
      StatusCode: new FormControl(''),
      StudentCode: new FormControl('', [Validators.required]),
      FullName: new FormControl('', [Validators.required]),
      FullNameOther: new FormControl(''),
      DateOfBirth: new FormControl('', [Validators.required]),
      ProvinceCityCode: new FormControl('', [Validators.required]),
      DistrictCode: new FormControl(''),
      WardCode: new FormControl(''),
      Village: new FormControl(''),
      Gender: new FormControl('', [Validators.required]),
      EnrolmentDate: new FormControl('', [Validators.required]),
      EnrolmentType: new FormControl(null),
      BirthPlace: new FormControl(''),
      HomeTown: new FormControl(''),
      PermanentResidentalAddress: new FormControl(''),
      TempResidentalAddress: new FormControl(''),
      EthnicCode: new FormControl(''),
      EthnicInBirthDayCertificate: new FormControl(''),
      EthnicOtherCode: new FormControl(''),
      AreaCode: new FormControl(''),
      ReligionCode: new FormControl(''),
      PoorAreaCode: new FormControl(''),
      PolicyObjectCode: new FormControl(''),
      PolicyCode: new FormControl(''),
      HasSupportCostStudying: new FormControl('', [Validators.required]),
      HasMonthlyGrant: new FormControl('', [Validators.required]),
      HasHousingAssistance: new FormControl('', [Validators.required]),
      StudentTypeCode: new FormControl(''),
      Accommodation: new FormControl(''),
      SupportMode: new FormControl(''),
      HasSupplyRice: new FormControl('', [Validators.required]),
      HasResettlement: new FormControl('', [Validators.required]),
      HasLearnKindergarten: new FormControl('', [Validators.required]),
      HSDTCoNhuCauHTNN: new FormControl('', [Validators.required]),
      HSDTCoTLTangCuongTV: new FormControl('', [Validators.required]),
      HasBilingualStudy: new FormControl('', [Validators.required]),
      HasDisability: new FormControl('', [Validators.required]),
      DisabilityTypeCode: new FormControl(''),
      DegreeDisability: new FormControl(''),
      IsYoungPioneer: new FormControl('', [Validators.required]),
      YoungPioneerJoinedDate: new FormControl(''),
      HasKnowSwim: new FormControl('', [Validators.required]),
      HasStudyDepartmentEducationalProgram: new FormControl('', [Validators.required]),
      IsEthnicStudentTeachingAssistant: new FormControl('', [Validators.required]),
      LuuBanNamTruoc: new FormControl('', [Validators.required]),
      HasLearnEthnicLanguage: new FormControl('', [Validators.required]),
      NumberLessionPerWeekCode: new FormControl(''),
      BloodGroup: new FormControl(null),
      HomePhoneNumber: new FormControl(''),
      MobilePhoneNumber: new FormControl(''),
      FamilyType: new FormControl(''),
      HasFatherIsEthnic: new FormControl('', [Validators.required]),
      HasMotherIsEthnic: new FormControl('', [Validators.required]),
      FatherName: new FormControl(''),
      FatherYearOfBirth: new FormControl(''),
      FatherProfession: new FormControl(''),
      FatherPhoneNumber: new FormControl(''),
      FatherEmail: new FormControl(''),
      MotherName: new FormControl(''),
      MotherYearOfBirth: new FormControl(''),
      MotherProfession: new FormControl(''),
      MotherPhoneNumber: new FormControl(''),
      MotherEmail: new FormControl(''),
      StorageNumber: new FormControl(''),
      GuardianName: new FormControl(''), 
      GuardianYearOfBirth: new FormControl(''),
      GuardianProfession: new FormControl(''),
      GuardianPhoneNumber: new FormControl(''),
      GuardianEmail: new FormControl(''),
    })
  }

  getStore() {
    //DM_TRANG_THAI_HOC_SINH
    this.ListStatusCode$ = this.store.pipe(select(getCate, CategoryType.DM_TRANG_THAI_HOC_SINH), takeUntil(this.ngUnsubscribe));
    this.ListStatusCode$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({ categoryCode: CategoryType.DM_TRANG_THAI_HOC_SINH }))
      }
    });

    //DM_GIOI_TINH
    this.ListGender$ = this.store.pipe(select(getCate, CategoryType.DM_GIOI_TINH), takeUntil(this.ngUnsubscribe));
    this.ListGender$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({ categoryCode: CategoryType.DM_GIOI_TINH }))
      }
    })

    //DM_DAN_TOC
    this.ListEthnicCode$ = this.store.pipe(select(getCate, CategoryType.DM_DAN_TOC), takeUntil(this.ngUnsubscribe));
    this.ListEthnicCode$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({ categoryCode: CategoryType.DM_DAN_TOC }))
      }
    })

    //DM_KHU_VUC
    this.ListAreaCode$ = this.store.pipe(select(getCate, CategoryType.DM_KHU_VUC), takeUntil(this.ngUnsubscribe));
    this.ListAreaCode$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({ categoryCode: CategoryType.DM_KHU_VUC }))
      }
    })

    //DM_VUNG_KHO_KHAN
    this.ListPoorAreaCode$ = this.store.pipe(select(getCate, CategoryType.DM_VUNG_KHO_KHAN), takeUntil(this.ngUnsubscribe));
    this.ListPoorAreaCode$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({ categoryCode: CategoryType.DM_VUNG_KHO_KHAN }))
      }
    })

    //DM_DIEN_CHINH_SACH
    this.ListPoorAreaCode$ = this.store.pipe(select(getCate, CategoryType.DM_DIEN_CHINH_SACH), takeUntil(this.ngUnsubscribe));
    this.ListPoorAreaCode$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({ categoryCode: CategoryType.DM_DIEN_CHINH_SACH }))
      }
    })

    //DM_LOAI_KHUYET_TAT
    this.ListPoorAreaCode$ = this.store.pipe(select(getCate, CategoryType.DM_LOAI_KHUYET_TAT), takeUntil(this.ngUnsubscribe));
    this.ListPoorAreaCode$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({ categoryCode: CategoryType.DM_LOAI_KHUYET_TAT }))
      }
    })

    //DM_SO_BUOI_HOC_TREN_TUAN
    this.NumberLessionPerWeekCode$ = this.store.pipe(select(getCate, CategoryType.DM_SO_BUOI_HOC_TREN_TUAN), takeUntil(this.ngUnsubscribe));
    this.NumberLessionPerWeekCode$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({ categoryCode: CategoryType.DM_SO_BUOI_HOC_TREN_TUAN }))
      }
    })
  }

  getClaasByGradeLevel(gradeLevel) {
    if(gradeLevel === null || gradeLevel === undefined){
      this.FormAddStudent.controls['ClassId'].setValue(null);
      this.FormAddStudent.controls.ClassId.disable();
      return;
    }
    this.isloadingClass = true;
    if(this.dataFilter && this.dataFilter.year){
      this.api.getClaasByGradeLevel(gradeLevel, this.dataFilter.year.code)
      .pipe(
        finalize(()=>{
          this.isloadingClass = false;
          this.cdRef.markForCheck();
        })
      )
      .subscribe(item=>{
        this.dsClass = item;
        this.isloadingClass = false;
        this.FormAddStudent.controls.ClassId.enable();
      }, error=>{
        this.isloadingClass = false;
        this.FormAddStudent.controls.ClassId.disable();
      })
    }
  }

  fileChange(e) {
    const file = e.srcElement.files[0];
    this.imgsrc = window.URL.createObjectURL(file);
  }

  save() {
    // this.submitted = true;
    // if (this.FormAddStudent.invalid) {
    //   return;
    // }
    let input = {
      blockCode: this.FormAddStudent.value.BlockCode,
      classId: this.FormAddStudent.value.ClassId,
      statusCode: this.FormAddStudent.value.StatusCode,
      studentCode: this.FormAddStudent.value.StudentCode,
      fullName: this.FormAddStudent.value.FullName,
      fullNameOther: this.FormAddStudent.value.FullNameOther,
      dateOfBirth: formatDate(this.FormAddStudent.value.DateOfBirth, 'yyyy-MM-dd', 'en'),
      provinceCityCode: 'ProvinceCityCode',//this.FormAddStudent.value.ProvinceCityCode
      districtCode: this.FormAddStudent.value.DistrictCode,
      wardCode: this.FormAddStudent.value.WardCode,
      village: this.FormAddStudent.value.Village,
      gender: this.FormAddStudent.value.Gender,
      enrolmentDate: formatDate(this.FormAddStudent.value.EnrolmentDate, 'yyyy-MM-dd', 'en'),
      enrolmentType: this.FormAddStudent.value.EnrolmentType,
      birthPlace: this.FormAddStudent.value.BirthPlace,
      homeTown: this.FormAddStudent.value.HomeTown,
      permanentResidentalAddress: this.FormAddStudent.value.PermanentResidentalAddress,
      tempResidentalAddress: this.FormAddStudent.value.TempResidentalAddress,
      ethnicCode: this.FormAddStudent.value.EthnicCode,
      ethnicInBirthDayCertificate: this.FormAddStudent.value.EthnicInBirthDayCertificate,
      ethnicOtherCode: this.FormAddStudent.value.EthnicOtherCode,
      areaCode: this.FormAddStudent.value.AreaCode,
      religionCode: this.FormAddStudent.value.ReligionCode,
      poorAreaCode: this.FormAddStudent.value.PoorAreaCode,
      policyObjectCode: this.FormAddStudent.value.PolicyObjectCode,
      policyCode: this.FormAddStudent.value.PolicyCode,
      hasSupportCostStudying: this.FormAddStudent.value.HasSupportCostStudying === true ? 1 : 0,
      hasMonthlyGrant: this.FormAddStudent.value.HasMonthlyGrant === true ? 1 : 0,
      hasHousingAssistance: this.FormAddStudent.value.HasHousingAssistance === true ? 1 : 0,
      studentTypeCode: this.FormAddStudent.value.BlockCode,
      accommodation: this.FormAddStudent.value.BlockCode,
      supportMode: this.FormAddStudent.value.BlockCode,
      hasSupplyRice: this.FormAddStudent.value.HasSupplyRice === true ? 1 : 0,
      hasResettlement: this.FormAddStudent.value.HasResettlement === true ? 1 : 0,
      hasLearnKindergarten: this.FormAddStudent.value.HasLearnKindergarten === true ? 1 : 0,
      hsdtCoNhuCauHTNN: this.FormAddStudent.value.HSDTCoNhuCauHTNN === true ? 1 : 0,
      hsdtCoTLTangCuongTV: this.FormAddStudent.value.HSDTCoTLTangCuongTV === true ? 1 : 0,
      hasBilingualStudy: this.FormAddStudent.value.HasBilingualStudy === true ? 1 : 0,
      hasDisability: this.FormAddStudent.value.HasDisability === true ? 1 : 0,
      disabilityTypeCode: this.FormAddStudent.value.DisabilityTypeCode,
      degreeDisability: this.FormAddStudent.value.DegreeDisability,
      isYoungPioneer: this.FormAddStudent.value.IsYoungPioneer === true ? 1 : 0,
      youngPioneerJoinedDate: this.FormAddStudent.value.YoungPioneerJoinedDate ? formatDate(this.FormAddStudent.value.YoungPioneerJoinedDate, 'yyyy-MM-dd', 'en') : '',
      hasKnowSwim: this.FormAddStudent.value.HasKnowSwim === true ? 1 : 0,
      hasStudyDepartmentEducationalProgram: this.FormAddStudent.value.HasStudyDepartmentEducationalProgram === true ? 1 : 0,
      isEthnicStudentTeachingAssistant: this.FormAddStudent.value.IsEthnicStudentTeachingAssistant === true ? 1 : 0,
      luuBanNamTruoc: this.FormAddStudent.value.LuuBanNamTruoc === true ? 1 : 0,
      hasLearnEthnicLanguage: this.FormAddStudent.value.HasLearnEthnicLanguage === true ? 1 : 0,
      numberLessionPerWeekCode: this.FormAddStudent.value.NumberLessionPerWeekCode,
      bloodGroup: this.FormAddStudent.value.BloodGroup,
      homePhoneNumber: this.FormAddStudent.value.HomePhoneNumber,
      mobilePhoneNumber: this.FormAddStudent.value.MobilePhoneNumber,
      familyType: this.FormAddStudent.value.FamilyType,
      hasFatherIsEthnic: this.FormAddStudent.value.HasFatherIsEthnic === true ? 1 : 0,
      hasMotherIsEthnic: this.FormAddStudent.value.HasMotherIsEthnic === true ? 1 : 0,
      fatherName: this.FormAddStudent.value.FatherName,
      fatherYearOfBirth: this.FormAddStudent.value.FatherYearOfBirth,
      fatherProfession: this.FormAddStudent.value.FatherProfession,
      fatherPhoneNumber: this.FormAddStudent.value.FatherPhoneNumber,
      fatherEmail: this.FormAddStudent.value.FatherEmail,
      motherName: this.FormAddStudent.value.MotherName,
      motherYearOfBirth: this.FormAddStudent.value.MotherYearOfBirth,
      motherProfession: this.FormAddStudent.value.MotherProfession,
      motherPhoneNumber: this.FormAddStudent.value.MotherPhoneNumber,
      motherEmail: this.FormAddStudent.value.MotherEmail,
      storageNumber: this.FormAddStudent.value.StorageNumber,
      guardianName: this.FormAddStudent.value.GuardianName,
      guardianYearOfBirth: this.FormAddStudent.value.GuardianYearOfBirth,
      guardianProfession: this.FormAddStudent.value.GuardianProfession,
      guardianPhoneNumber: this.FormAddStudent.value.GuardianPhoneNumber,
      guardianEmail: this.FormAddStudent.value.GuardianEmail,
    }
    console.log(input)
    this.api.CreateStudent(input)
      .pipe(
        finalize(() => {
          this.isloading = false;
        })
      )
      .subscribe(() => {
        this.toastr.success('Cập nhật thành công.');
        this.isloading = false;
      }, error => {
        this.isloading = false;
      })
  }

  get f() {
    return this.FormAddStudent.controls;
  }

  back() {
    this._location.back();
  }

  reset() {
    this.FormAddStudent.reset();
  }

}
