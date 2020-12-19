import {Component, Input, OnInit} from '@angular/core';
import {locale} from '../../../../../../../core/_config/i18n/vi';
import {EvaluationCriteriaModel} from '../../../../../../../core/evaluation-criteria';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject} from 'rxjs';
import {CareerAssessmentHistoryService} from '../../../../../../../core/service/service-model/career-assessment-history.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {
  CreatProfessionalStandardModel,
  EvaluationHistoryModel,
  NewEvaluationHistoryModel
} from '../../../../../../../core/service/model/professional-standard.model';
import {ProfessionalStandardService} from '../../../../../../../core/service/service-model/professional-standard.service';
import {SmasContextService} from '../../../../../../../core/_base/layout';
import {SmasConText} from '../../../../../../../core/_base/layout/models/smas-context.model';
import {NotiService} from '../../../../../../../core/service/service-model/notification.service';
import {EvaluationCriteriaService} from '../../../../../../../core/service/service-model/evaluation-criteria.service';

@Component({
  selector: 'kt-career-assessment',
  templateUrl: './career-assessment.component.html',
  styleUrls: ['./career-assessment.component.scss']
})
export class CareerAssessmentComponent implements OnInit {
  VI_LANG = locale.data;
  @Input() employeeId : string;
  addLoading=false;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  form:FormGroup;
  loading=false;
  update:boolean;
  data=[];
  newData=[];
  ProfessionalStandard=[];
  ProfessionalStandardId:string;
  schoolYearId:string;
  listColumns: EvaluationCriteriaModel[] = [];
  public CreatProfessionalStandard:CreatProfessionalStandardModel;
  boolEdit = false;
  code='CAREER_STANDARD_EVALUATION'
  public default = 'Chưa đánh giá';
  smasContextModel: SmasConText;
  constructor(
    private _NgbActiveModal: NgbActiveModal,
    private careerAssessmentHistoryService: CareerAssessmentHistoryService,
    private ProfessionalStander: ProfessionalStandardService,
    private smasContextService: SmasContextService,
    private evaluationCriteria: EvaluationCriteriaService,
    private notiService: NotiService
  ) {
    this.smasContextService.onConfigUpdated$.subscribe((ctx) => {
      this.smasContextModel = this.smasContextService.getSmasConText();
    });
    this.smasContextModel = this.smasContextService.getSmasConText();
    this.schoolYearId = this.smasContextModel.year.id;
  }


  ngOnInit(): void {
    this.getListDataEvaluation();
  }

  get activeModal() {
    return this._NgbActiveModal;
  }

  public cancel() {
    this.activeModal.dismiss();
  }

  getListDataEvaluation(){
    this.loading=true;
    this.careerAssessmentHistoryService.getAssessmentHistoryByEmployeeId(this.employeeId,this.schoolYearId).subscribe(res=>{
      if (res.length!=0) {
        this.data = res;
        this.update = true;
        this.ProfessionalStandard = res;
        this.ProfessionalStandardId = res[0].careerStandardEvaluationId;
        this.loading=false;
      } else {
        this.update=false;
        this.evaluationCriteria.getEvaluate(this.code).subscribe(response=>{
          this.newData=response
          this.newData.forEach(item=>{
            const evaluationHistoryModel = new NewEvaluationHistoryModel();
            evaluationHistoryModel.id = item.id;
            evaluationHistoryModel.employeeId=this.employeeId;
            evaluationHistoryModel.careerStandardEvaluationId = item.evaluationCriteriaGroupId;
            evaluationHistoryModel.criteriaValue=item.value;
            evaluationHistoryModel.criteriaCode=item.code;
            evaluationHistoryModel.criteriaContent=item.name;
            evaluationHistoryModel.superiorEvaluationValue=' Chưa đánh giá';
            evaluationHistoryModel.employeeEvaluationValue=' Chưa đánh giá';
            evaluationHistoryModel.expireEditDate=new Date();
            this.ProfessionalStandard.push(evaluationHistoryModel);
          })
        })
        this.loading=false;
      }
    },error => {
      this.isLoading$.next(false)
    })
  }

  changeSuperiorAssessment(event, dataItem) {
    this.ProfessionalStandard.forEach(item=>{
      if (item.id === dataItem.id){
        item.employeeEvaluationValue = dataItem.employeeEvaluationValue;
      }
    })
    console.log(this.ProfessionalStandard)
  }

  changeSelfAssessment(event, dataItem) {
    this.ProfessionalStandard.forEach(item=>{
      if (item.id === dataItem.id){
        item.superiorEvaluationValue = dataItem.superiorEvaluationValue;
      }
    })
  }

  save(){
    this.loading=true;
    this.CreatProfessionalStandard ={
      employeeId : this.employeeId,
      employeeSelfAssessmentResult : null,
      superiorSelfAssessmentResult : null,
      schoolYearId: this.schoolYearId,
      schoolYear: this.smasContextModel.year.code,
      lstEvaluationHistory: this.ProfessionalStandard,
    }
    if(this.update) {
      this.ProfessionalStander.PutProfessionalStandard(this.CreatProfessionalStandard, this.ProfessionalStandardId).subscribe(data => {
        this.notiService.updateSuccess();
        this.loading = false;
        this.activeModal.dismiss();
      }, error => {
        this.loading = false;
      })
    }
    if(!this.update){
      this.ProfessionalStander.PostProfessionalStandard(this.CreatProfessionalStandard).subscribe(data => {
        this.notiService.updateSuccess();
        this.loading = false;
        this.activeModal.dismiss();
      }, error => {
        this.loading = false;
      })
    }
  }
}
