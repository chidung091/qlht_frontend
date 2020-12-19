import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {AllCategoriesRequested, Category, getCate, getCateLoaded} from '../../../../../../core/category';
import {select, Store} from '@ngrx/store';
import {CategoryType} from '../../../../../../core/_constants';
import {map} from 'rxjs/operators';
import {ModalAddEditComponent} from '../../../../system/school-year/modal-add-edit/modal-add-edit.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CareerAssessmentComponent} from './career-assessment/career-assessment.component';
import {Router} from '@angular/router';
import {SmasConText} from '../../../../../../core/_base/layout/models/smas-context.model';
import {SmasContextService} from '../../../../../../core/_base/layout';
import {ProfessionalStandardService} from '../../../../../../core/service/service-model/professional-standard.service';

@Component({
  selector: 'kt-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() editID: string;
  defaultDropdown = {cateCode: null, cateName: 'Lựa chọn'}
  loadEdit=false;
  smasContextModel: SmasConText;
  employeeSelfAssessmentResult:any;
  superiorSelfAssessmentResult:any;
  schoolYearId:string;

  _6$: Observable<Category[]>
  _6Loaded$: Observable<boolean>;
  _7$: Observable<Category[]>
  _7Loaded$: Observable<boolean>;


  constructor(
    private store: Store,
    public modal: NgbModal,
    public router: Router,
    private smasContextService: SmasContextService,
    private professionalStander: ProfessionalStandardService,
  ) {
    this.smasContextService.onConfigUpdated$.subscribe((ctx) => {
      this.smasContextModel = this.smasContextService.getSmasConText();
    });
    this.smasContextModel = this.smasContextService.getSmasConText();
    this.schoolYearId = this.smasContextModel.year.id;
  }

  ngOnInit(): void {
    this.initForm();
    this.selectStore();
    this.loadingEditData();
    // this.getProfessionalStandardByEmployeeId();
  }

  initForm() {
    this.form.addControl('employeeSelfAssessmentResult', new FormControl(''))
    this.form.addControl('superiorSelfAssessmentResult', new FormControl(''))
    this.form.addControl('3', new FormControl(''))
    this.form.addControl('4', new FormControl(''))
    this.form.addControl('appellationAward', new FormControl('',[Validators.maxLength(250)]))
    this.form.addControl('goodHeadTeacherCode', new FormControl(null))
    this.form.addControl('goodHeadTeacherName', new FormControl(null))
    this.form.addControl('goodTeamGeneralCode', new FormControl(null))
    this.form.addControl('goodTeamGeneralName', new FormControl(null))

    this.form.get('employeeSelfAssessmentResult').disable();
    this.form.get('superiorSelfAssessmentResult').disable();
    this.form.get('3').disable();
    this.form.get('4').disable();
  }

  selectStore() {
    this._6$ = this.store.pipe(select(getCate, CategoryType.DM_GIAO_VIEN_CHU_NHIEM_GIOI));
    this._6Loaded$ = this.store.pipe(select(getCateLoaded, CategoryType.DM_GIAO_VIEN_CHU_NHIEM_GIOI), map(value => !value))
    this._6$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_GIAO_VIEN_CHU_NHIEM_GIOI}))
      }
    });

    this._7$ = this.store.pipe(select(getCate, CategoryType.DM_GV_TONG_PTRACH_DOI_GIOI));
    this._7Loaded$ = this.store.pipe(select(getCateLoaded, CategoryType.DM_GV_TONG_PTRACH_DOI_GIOI), map(value => !value))
    this._7$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_GV_TONG_PTRACH_DOI_GIOI}))
      }
    });
  }

  openModal(){
    const modalRef = this.modal.open(CareerAssessmentComponent, {size: 'lg', centered: true});
    modalRef.componentInstance.employeeId = this.editID;
    modalRef.result.then(data => {
      if (data === 'Thành công') {
        console.log('a')
      }
    }).catch((error) => error);
  }

  loadingEditData() {
    if (this.router.url.includes('edit-profile')) {
      this.loadEdit=true;
    }
  }

  cateSelected(value, name) {
    this.form.get(name).setValue(value.cateName)
  }
  // getProfessionalStandardByEmployeeId(){
  //   this.professionalStander.getProfessionalStandardByEmployeeId(this.editID,this.schoolYearId).subscribe(res=>{
  //     this.form.get('employeeSelfAssessmentResult').setValue(res['employeeSelfAssessmentResult']);
  //     this.form.get('superiorSelfAssessmentResult').setValue(res['superiorSelfAssessmentResult']);
  //   })
  // }


}
