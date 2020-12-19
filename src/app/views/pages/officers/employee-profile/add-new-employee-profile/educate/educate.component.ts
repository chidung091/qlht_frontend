import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {AllCategoriesRequested, Category, getCate, ListCateCode} from '../../../../../../core/category';
import {select, Store} from '@ngrx/store';
import {CategoryType} from '../../../../../../core/_constants';
import {NgUnsubscribe} from '../../../../../shared/directives';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'kt-educate',
  templateUrl: './educate.component.html',
  styleUrls: ['./educate.component.scss']
})
export class EducateComponent extends NgUnsubscribe implements OnInit {

  @Input() form: FormGroup;
  defaultDropdown = {cateCode: null, cateName: 'Lựa chọn'}

  isLoading: boolean;

  // region Store Observable
  qualification$: Observable<Category[]> // trình độ CMNV cao nhất
  politicalTheoryLevel$: Observable<Category[]> // trình độ lý luận chính trị
  computerSkill$: Observable<Category[]> // trình độ tin học
  majorTrainingMajor$: Observable<Category[]> // chuyên ngành đào tạo chính
  otherTrainingMajor$: Observable<Category[]> // chuyên ngành đào tạo khác
  levelMajor$: Observable<Category[]> // trình độ
  levelOther$: Observable<Category[]> // trình độ
  specializedFormMajor$: Observable<Category[]> // hình thức
  specializedFormOther$: Observable<Category[]> // hình thức
  eduManagementQualification$: Observable<Category[]> // trình độ QL giáo dục
  certInEthnicMinorityLang$: Observable<Category[]> // giáo viên có chứng chỉ tiếng dân tộc thiểu số
  eduManagementTraining$: Observable<Category[]> // Tham gia bồi dưỡng nghiệp vụ quản lý giáo dục
  managementStaffTraining$: Observable<Category[]> // Tham gia bồi dưỡng cán bộ quản lý cốt cán
  bookTraining$: Observable<Category[]> // Tham gia bồi dưỡng thay sách
  educationLevel$: Observable<Category[]> // Trình độ văn hoá
  primaryLang$: Observable<Category[]> // Ngoại ngữ chính
  primaryLangProficiency$: Observable<Category[]> // Trình độ ngoại ngữ chính
  primaryLangTrainingLevel$: Observable<Category[]> // Trình độ đào tạo ngoại ngữ chính
  certLangType$: Observable<Category[]> // Loại chứng chỉ ngoại ngữ
  groupCertLang$: Observable<Category[]> // Nhóm chứng chỉ ngoại ngữ
  proficiencyLangFrameWork$: Observable<Category[]> // Khung năng lực ngoại ngữ
  stateManagementQualification$: Observable<Category[]> // Trình độ quản lý nhà nước

  // endregion

  bookTraining = [{cateName: 'Đã tham gia',cateCode: '01'},{cateName: 'Chưa tham gia', cateCode: '02'}]
  constructor(private store: Store) {
    super()
  }

  ngOnInit(): void {
    this.selectStore();
    this.initForm();
  }

  initForm() {
    this.form.addControl('DM_KQ_BOI_DUONG_TX', new FormControl(null));
    this.form.addControl('DM_KQ_BOI_DUONG_TX_name', new FormControl('DM_KQ_BOI_DUONG_TX'));
    this.form.addControl('DM_CHUYEN_MON', new FormControl(null));
    this.form.addControl('DM_CHUYEN_MON_name', new FormControl(null));
    this.form.addControl('DM_TRINH_DO_LLCT', new FormControl(null));
    this.form.addControl('DM_TRINH_DO_LLCT_name', new FormControl(null));
    this.form.addControl('DM_TRINH_DO_TIN_HOC', new FormControl(null));
    this.form.addControl('DM_TRINH_DO_TIN_HOC_name', new FormControl(null));
    this.form.addControl('DM_NGANH_DAO_TAO_CHINH', new FormControl(null));
    this.form.addControl('DM_NGANH_DAO_TAO_CHINH_name', new FormControl(null));
    this.form.addControl('DM_TRINH_DO_CHINH', new FormControl(null));
    this.form.addControl('DM_TRINH_DO_CHINH_name', new FormControl(null));
    this.form.addControl('DM_HINH_THUC_DAO_TAO_CHINH', new FormControl(null));
    this.form.addControl('DM_HINH_THUC_DAO_TAO_CHINH_name', new FormControl(null));
    this.form.addControl('DM_NGANH_DAO_TAO_KHAC', new FormControl(null));
    this.form.addControl('DM_NGANH_DAO_TAO_KHAC_name', new FormControl(null));
    this.form.addControl('DM_TRINH_DO_KHAC', new FormControl(null));
    this.form.addControl('DM_TRINH_DO_KHAC_name', new FormControl(null));
    this.form.addControl('DM_HINH_THUC_DAO_TAO_KHAC', new FormControl(null));
    this.form.addControl('DM_HINH_THUC_DAO_TAO_KHAC_name', new FormControl(null));
    this.form.addControl('DM_TRINH_DO_QLGD', new FormControl(null));
    this.form.addControl('DM_TRINH_DO_QLGD_name', new FormControl(null));
    this.form.addControl('DM_CHUNG_CHI_TIENG_DTOC_TSO', new FormControl(null));
    this.form.addControl('DM_CHUNG_CHI_TIENG_DTOC_TSO_name', new FormControl(null));
    this.form.addControl('DM_BOI_DUONG_NVU', new FormControl(null));
    this.form.addControl('DM_BOI_DUONG_NVU_name', new FormControl(null));
    this.form.addControl('DM_BOI_DUONG_CBQL_COT_CAN', new FormControl(null));
    this.form.addControl('DM_BOI_DUONG_CBQL_COT_CAN_name', new FormControl(null));
    this.form.addControl('DM_BOI_DUONG_THAY_SACH', new FormControl(null));
    this.form.addControl('DM_BOI_DUONG_THAY_SACH_name', new FormControl(null));
    this.form.addControl('16', new FormControl(null));
    this.form.addControl('DM_NGOAI_NGU', new FormControl(null));
    this.form.addControl('DM_NGOAI_NGU_name', new FormControl(null));
    this.form.addControl('DM_TRINH_DO_NGOAI_NGU', new FormControl(null));
    this.form.addControl('DM_TRINH_DO_NGOAI_NGU_name', new FormControl(null));
    this.form.addControl('DM_TRINH_DO_NN', new FormControl(null));
    this.form.addControl('DM_TRINH_DO_NN_name', new FormControl(null));
    this.form.addControl('DM_LOAI_CCHI_NNGU', new FormControl(null));
    this.form.addControl('DM_LOAI_CCHI_NNGU_name', new FormControl(null));
    this.form.addControl('DM_DIEM_NN', new FormControl(null));
    this.form.addControl('DM_DIEM_NN_name', new FormControl('DM_DIEM_NN'));
    this.form.addControl('DM_NHOM_CCHI_NNGU', new FormControl(null));
    this.form.addControl('DM_NHOM_CCHI_NNGU_name', new FormControl(null));
    this.form.addControl('DM_KHUNG_NLUC_NNGU', new FormControl(null));
    this.form.addControl('DM_KHUNG_NLUC_NNGU_name', new FormControl(null));
    this.form.addControl('DM_TRINH_DO_QLNN', new FormControl(null));
    this.form.addControl('DM_TRINH_DO_QLNN_name', new FormControl(null));
  }

  selectStore() {
    this.qualification$ = this.store.pipe(select(getCate, CategoryType.DM_CHUYEN_MON), takeUntil(this.ngUnsubscribe));
    this.qualification$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_CHUYEN_MON}))
      }
    })

    this.politicalTheoryLevel$ = this.store.pipe(select(getCate, CategoryType.DM_TRINH_DO_LLCT), takeUntil(this.ngUnsubscribe));
    this.politicalTheoryLevel$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_TRINH_DO_LLCT}))
      }
    })

    this.computerSkill$ = this.store.pipe(select(getCate, CategoryType.DM_TRINH_DO_TIN_HOC), takeUntil(this.ngUnsubscribe));
    this.computerSkill$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_TRINH_DO_TIN_HOC}))
      }
    })

    this.majorTrainingMajor$ = this.store.pipe(select(getCate, CategoryType.DM_NGANH_DAO_TAO), takeUntil(this.ngUnsubscribe));
    this.majorTrainingMajor$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_NGANH_DAO_TAO}))
      }
    })

    this.otherTrainingMajor$ = this.store.pipe(select(getCate, CategoryType.DM_NGANH_DAO_TAO), takeUntil(this.ngUnsubscribe));
    this.otherTrainingMajor$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_NGANH_DAO_TAO}))
      }
    })

    this.levelMajor$ = this.store.pipe(select(getCate, CategoryType.DM_TRINH_DO), takeUntil(this.ngUnsubscribe));
    this.levelMajor$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_TRINH_DO}))
      }
    })
    this.levelOther$ = this.store.pipe(select(getCate, CategoryType.DM_TRINH_DO), takeUntil(this.ngUnsubscribe));
    this.levelOther$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_TRINH_DO}))
      }
    })

    this.specializedFormOther$ = this.store.pipe(select(getCate, CategoryType.DM_HINH_THUC_DAO_TAO), takeUntil(this.ngUnsubscribe));
    this.specializedFormOther$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_HINH_THUC_DAO_TAO}))
      }
    })
    this.specializedFormMajor$ = this.store.pipe(select(getCate, CategoryType.DM_HINH_THUC_DAO_TAO), takeUntil(this.ngUnsubscribe));
    this.specializedFormMajor$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_HINH_THUC_DAO_TAO}))
      }
    })

    this.eduManagementQualification$ = this.store.pipe(select(getCate, CategoryType.DM_TRINH_DO_QLGD), takeUntil(this.ngUnsubscribe));
    this.eduManagementQualification$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_TRINH_DO_QLGD}))
      }
    })

    this.certInEthnicMinorityLang$ = this.store.pipe(select(getCate, CategoryType.DM_CHUNG_CHI_TIENG_DTOC_TSO), takeUntil(this.ngUnsubscribe));
    this.certInEthnicMinorityLang$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_CHUNG_CHI_TIENG_DTOC_TSO}))
      }
    })

    this.eduManagementTraining$ = this.store.pipe(select(getCate, CategoryType.DM_BOI_DUONG_NVU), takeUntil(this.ngUnsubscribe));
    this.eduManagementTraining$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_BOI_DUONG_NVU}))
      }
    })

    this.managementStaffTraining$ = this.store.pipe(select(getCate, CategoryType.DM_BOI_DUONG_CBQL_COT_CAN), takeUntil(this.ngUnsubscribe));
    this.managementStaffTraining$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_BOI_DUONG_CBQL_COT_CAN}))
      }
    })

    this.bookTraining$ = this.store.pipe(select(getCate, CategoryType.DM_BOI_DUONG_THAY_SACH), takeUntil(this.ngUnsubscribe));
    this.bookTraining$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_BOI_DUONG_THAY_SACH}))
      }
    })

    // Chưa có danh mục
    this.educationLevel$ = this.store.pipe(select(getCate, ListCateCode.dmLoaiHinh), takeUntil(this.ngUnsubscribe));
    this.educationLevel$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: ListCateCode.dmLoaiHinh}))
      }
    })

    this.primaryLang$ = this.store.pipe(select(getCate, CategoryType.DM_NGOAI_NGU), takeUntil(this.ngUnsubscribe));
    this.primaryLang$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_NGOAI_NGU}))
      }
    })

    this.primaryLangProficiency$ = this.store.pipe(select(getCate, CategoryType.DM_TRINH_DO_NGOAI_NGU), takeUntil(this.ngUnsubscribe));
    this.primaryLangProficiency$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_TRINH_DO_NGOAI_NGU}))
      }
    })

    this.primaryLangTrainingLevel$ = this.store.pipe(select(getCate, CategoryType.DM_TRINH_DO), takeUntil(this.ngUnsubscribe));
    this.primaryLangTrainingLevel$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_TRINH_DO}))
      }
    })

    this.certLangType$ = this.store.pipe(select(getCate, CategoryType.DM_LOAI_CCHI_NNGU), takeUntil(this.ngUnsubscribe));
    this.certLangType$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_LOAI_CCHI_NNGU}))
      }
    })

    this.groupCertLang$ = this.store.pipe(select(getCate, CategoryType.DM_NHOM_CCHI_NNGU), takeUntil(this.ngUnsubscribe));
    this.groupCertLang$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_NHOM_CCHI_NNGU}))
      }
    })

    this.proficiencyLangFrameWork$ = this.store.pipe(select(getCate, CategoryType.DM_KHUNG_NLUC_NNGU), takeUntil(this.ngUnsubscribe));
    this.proficiencyLangFrameWork$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_KHUNG_NLUC_NNGU}))
      }
    })

    this.stateManagementQualification$ = this.store.pipe(select(getCate, CategoryType.DM_TRINH_DO_QLNN), takeUntil(this.ngUnsubscribe));
    this.stateManagementQualification$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_TRINH_DO_QLNN}))
      }
    })
  }

  setCateName(value,name){
    this.form.get(name+'_name').setValue(value.cateName)
  }
}
