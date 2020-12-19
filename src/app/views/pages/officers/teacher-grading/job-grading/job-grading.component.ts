import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {ManagermentService} from '../../../../../core/service/service-model/managerment.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {aggregateBy, State} from '@progress/kendo-data-query';
import {products} from '../../standard-assessment/products';
import {ManagermentState} from '../../../../../core/service/states/managerment.state';
import {GetManagerments} from '../../../../../core/service/actions/managerment-action';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ConfigurationGradingComponent} from '../configuration-grading/configuration-grading.component';
import {GroupEvaluationCriteriaService} from '../../../../../core/service/service-model/Group-Evaluation-Criteria.service';
import {EvaluationCriteriaModel} from '../../../../../core/service/model/evaluation-criteria.model';
import {GroupEvaluationCriteria} from '../../../../../core/service/model/group-evaluation-criteria';
import {EvaluationCriteriaService} from '../../../../../core/service/service-model/evaluation-criteria.service';
import {NotiService} from '../../../../../core/service/service-model/notification.service';
import {ProfessionalStandardService} from '../../../../../core/service/service-model/professional-standard.service';
import {
  CreatProfessionalStandardModel, EvaluationHistoryModel, HistoryProfessionalStandardModel,
  ProfessionalStandardModel
} from '../../../../../core/service/model/professional-standard.model';
import {GridDataResult} from '@progress/kendo-angular-grid';
import {CareerAssessmentHistoryService} from '../../../../../core/service/service-model/career-assessment-history.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {SmasContextService} from '../../../../../core/_base/layout';
import {SmasConText} from '../../../../../core/_base/layout/models/smas-context.model';
import {locale} from '../../../../../core/_config/i18n/vi';
import {TeacherGradingFindModel, TeacherGradingModel} from '../../../../../core/service/model/teacher-grading';
import {EmployeeService} from '../../../../../core/service/service-model/employee.service';

@Component({
  selector: 'kt-job-grading',
  templateUrl: './job-grading.component.html',
  styleUrls: ['./job-grading.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class JobGradingComponent implements OnInit {

  constructor(private store: Store,
              private managermentService: ManagermentService,
              private modalService: NgbModal,
              private config: NgbModalConfig,
              private groupEvaluationCriteria: GroupEvaluationCriteriaService,
              private EvaluationCriteria: EvaluationCriteriaService,
              private ProfessionalStander: ProfessionalStandardService,
              private asessmentHistory : CareerAssessmentHistoryService,
              private fb: FormBuilder,
              private smasContextService: SmasContextService,
              private employeeService: EmployeeService,
              private notiService: NotiService) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.store.dispatch(new GetManagerments()).subscribe(() => {
      this.loadPage.next(false);
    });

    this.smasContextService.onConfigUpdated$.subscribe(() => {
      this.smasContextModel = this.smasContextService.getSmasConText();
      if (this.smasContextModel.year.code) {
        this.loadEvaluateStandardCereer();
      }
    });
    this.smasContextModel = this.smasContextService.getSmasConText();

  }
  smasContextModel: SmasConText;
  isCollapsed = false;
  VI_LANG = locale.data;
  pageSizes: Array<number> = [10, 20];
  collapse = false;
  choose: any;
  public aggregates: any[] = [{field: 'UnitPrice', aggregate: 'sum'}];
  arrayBuffer:any;
  file:File;
  animal: string;
  IdDanhGia:string;
  public total: any = aggregateBy(products, this.aggregates);
  tenCanBo = '';
  public loadGrid = false;
  public loadPage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loadingDelete: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  @Select(ManagermentState.manager) totalItem$: Observable<number>;
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public loadingPopupedit: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public  data: any;
  public tieuChi : EvaluationCriteriaModel[];
  public nhomTieuChi : GroupEvaluationCriteria[];
  public chuanNgheNghiep : ProfessionalStandardModel[];
  public lichSuDanhGia : EvaluationHistoryModel[];
  public changeLichSuDanhGia : EvaluationHistoryModel[];
  public selectDefaultTC : EvaluationHistoryModel;
  public historyProfessionalStandardModel : HistoryProfessionalStandardModel;
  public idEmployee:any;
  public _pageSize = 5;
  public skip = 0;
  public mySelection: string[] = [];
  public idDelete : string[] = [];
  public listDrop : string[] = [];
  public gridView: GridDataResult;
  public CreatProfessionalStandar:CreatProfessionalStandardModel;
  public teacherGradingFindIF: TeacherGradingFindModel = new TeacherGradingFindModel();
  idSchoolFaculty:string;
  nameTeacher:string;
  iDCanBo : string;
  list: string[][] = [];
  list1: string[][] = [];
  public loadingPage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loadingPopup: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public disableBtn1: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public disableBtn2: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  loadPupupGrid1 =false;
  loadPupupGrid2 =false;
  delAllbtn = true;
  nulld = '00000000-0000-0000-0000-000000000000';
  codeTeacherAssessment = 'CAREER_STANDARD_EVALUATION';
  checkbox = false;
  btnConfirm: boolean;
  indexSelfAssessment =0;
  indexSuperiorAssessment =0;
  private listGrading: ProfessionalStandardModel[] = [];
  employee : { schoolYear: string; employeeId: any; schoolYearId: string;};
  // @ts-ignore
  // tslint:disable-next-line:max-line-length
  ProfessionalStandard : [{ criteriaCode: string; employeeId: any; id: any; careerStandardEvaluationId: any; criteriaValue: any; criteriaContent: any;}]= [];
  checkSelfAssessment:boolean;
  public arrayTieuChi : { code: string; creationTime: null; description: null; id: string; value: string };
  defaultSelfAssessment = 'Lựa chọn';

  ngOnInit(): void {
    this.disableBtn1.next(true);
    this.loadNhomTieuChi();
    this.loadTieuChi();
    this.loadEvaluateStandardCereer();
  }

  createFormFind() {
    this.teacherGradingFindIF.facultyId = this.idSchoolFaculty;
    this.teacherGradingFindIF.fullName = this.nameTeacher;
    this.teacherGradingFindIF.evaluationGroupCode = this.codeTeacherAssessment;
    this.teacherGradingFindIF.schoolYearID = this.smasContextModel.year.id;
    this.teacherGradingFindIF.schoolYearCode = this.smasContextModel.year.code;
    this.teacherGradingFindIF.skipCount = this.skip;
    this.teacherGradingFindIF.maxResultCount = this._pageSize;
  }
  //load danh gia chuan nghe nghiep
  loadEvaluateStandardCereer(){
    this.loadingPage.next(true);
    this.isLoading$.next(true);
    this.createFormFind();
      this.ProfessionalStander.mergeMapConcat(this.teacherGradingFindIF).subscribe(data => {
        this.listGrading = [];
        data.employee.forEach(item => {
          const ProfessionalStandard = new ProfessionalStandardModel();
            ProfessionalStandard.id = this.nulld;
            ProfessionalStandard.employeeId = item.id;
            ProfessionalStandard.employeeCode = item.code;
            ProfessionalStandard.employeeName = item.fullName;
            ProfessionalStandard.facultyId = item.schoolFacultyID;
            ProfessionalStandard.facultyName = item.schoolFacultyName;
            ProfessionalStandard.employeeBirthDate = item.birthDate;
            ProfessionalStandard.employeeGender = item.genderName;
            ProfessionalStandard.employeePositionStaff = item.positionStaffName;
            ProfessionalStandard.employeePositionGroup = item.positionGroupName;
            ProfessionalStandard.employeeSelfAssessmentResult = '';
            ProfessionalStandard.superiorSelfAssessmentResult = '';
          this.listGrading.push(ProfessionalStandard);
        });
        data.grading.forEach(item => {
          const index = this.listGrading.findIndex(itemxG => itemxG.employeeId === item.employeeId);
          if (index > -1) {
            this.listGrading[index] = item;
          }
        });
        this.chuanNgheNghiep=this.listGrading;

        this.gridView = ({
          total: data.total,
          data: this.chuanNgheNghiep,
        })
        setTimeout(() => this.checkBox(this.gridView.data));
        this.loadingPage.next(false);
        this.isLoading$.next(true);
      },error => {
        this.loadingPage.next(false);
        this.isLoading$.next(true);
      })

  }

  checkBox(data: ProfessionalStandardModel[]) {
    const cls = document.getElementsByClassName('k-checkbox');
    data.forEach((psm, index) => {
      if (psm.id === this.nulld) {
        if (cls !== null) Array.prototype.forEach.call(cls, el => {
          const index1 =index +5;   const index2 =index +10;   const index3 =index +20;
          if (el.id.split('-')[2] === 'checkbox' + index || el.id.split('-')[2] === 'checkbox' + index1
            || el.id.split('-')[2] === 'checkbox' + index2 || el.id.split('-')[2] === 'checkbox' + index3) {
            if (document.getElementById(el.id) !== null) (document.getElementById(el.id) as HTMLInputElement).setAttribute('disabled', 'true');
          }
        });
      }
      else{
        if (cls !== null) Array.prototype.forEach.call(cls, el => {
          const index1 =index +5;   const index2 =index +10;   const index3 =index +20;
          if (el.id.split('-')[2] === 'checkbox' + index|| el.id.split('-')[2] === 'checkbox' + index1
            || el.id.split('-')[2] === 'checkbox' + index2 || el.id.split('-')[2] === 'checkbox' + index3) {
            (document.getElementById(el.id) as HTMLInputElement).removeAttribute('disabled');
          }
        });
      }
    })
  }

  loadNhomTieuChi(){
    this.groupEvaluationCriteria.getGroupEvaluate().subscribe(data =>{
      this.nhomTieuChi=data;
      this.nhomTieuChi.forEach((nhomTC) =>{
        if(nhomTC.code === this.codeTeacherAssessment) {
          this.checkSelfAssessment = nhomTC.employeeSelfAssign;
        }
      })
    })
  }
  loadTieuChi(){
    this.loadPupupGrid1=false;
    this.loadingPopup.next(true);
    this.groupEvaluationCriteria.getGroupEvaluate().subscribe(data =>{
      this.nhomTieuChi=data;
      this.nhomTieuChi.forEach((nhomTC)=>{
        if(nhomTC.code === this.codeTeacherAssessment){
          this.EvaluationCriteria.getEvaluate(this.codeTeacherAssessment).subscribe(data =>{
            this.tieuChi = data;
            this.tieuChi.forEach((item) =>{
              this.list.push(item.value.split(','));
            })
            this.loadingPopup.next(false);
            this.loadPupupGrid1=true;
          },error => {
            this.loadingPopup.next(false);
            this.loadPupupGrid1=true;
          })
        }else{
        }
      })
    },error => {
      this.loadingPopup.next(false);
      this.loadPupupGrid1=true;
    })
  }

  loadHistoryAssess(id: string){
    this.loadPupupGrid2=false;
    this.loadingPopup.next(true);
    this.asessmentHistory.getAssessmentHistory(id).subscribe( data =>{
      this.loadPupupGrid2=true;
      this.lichSuDanhGia = data;
      this.lichSuDanhGia.forEach((item)=>{
        this.list1.push(item.criteriaValue.split(','))
      })
      this.changeLichSuDanhGia = JSON.parse(JSON.stringify(data));
      this.loadingPopup.next(false);

    },error => {
      this.loadPupupGrid2=true;
    })
  }
  search(value:any){
    this.idSchoolFaculty = value.idSchoolFaculty;
    this.nameTeacher = value.nameTeacher;
    this.skip = 0;
    this. createFormFind();
    this.loadEvaluateStandardCereer();
    this.loadEvaluateStandardCereer();
  }

  // open tieu chí đánh giá
  openDialog(content,data) {
    this.tenCanBo= data.employeeName;
    this.idEmployee = data.employeeId;
    this.modalService.open(content,{size: 'lg', centered: true});
    this.iDCanBo = data.id;
    this.loadingPage.next(false);
    this.disableBtn1.next(true);
    if(this.iDCanBo === this.nulld){
      this.lichSuDanhGia= null;
      this.loadTieuChi();
      this.loadPupupGrid2=false;
    }else {
      this.tieuChi = null;
      this.loadHistoryAssess(data.id);
      this.IdDanhGia=data.id;
      this.loadPupupGrid1=false;
    }
  }

  // event change cấp trên đánh giá
  changeSuperiorAssessment(event, dataItem) {
    const newObject = {
      id: dataItem.id,
      careerStandardEvaluationId: '',
      employeeId: this.idEmployee,
      criteriaCode: dataItem.name,
      criteriaValue: dataItem.value,
      criteriaContent: dataItem.description,
      superiorEvaluationValue: event
    }
    const element = this.ProfessionalStandard.find((e)=> e.id === dataItem.id);
    if(element === undefined){
      this.ProfessionalStandard.push(newObject)
    } else  {
      this.ProfessionalStandard.map((e) => {
        if(e.id === dataItem.id && event !==this.defaultSelfAssessment){
          e['superiorEvaluationValue'] = event
        }else if(e.id === dataItem.id && event ===this.defaultSelfAssessment){
          e['superiorEvaluationValue'] = ''
        }
        return e;
      })
    }
    const res = this.ProfessionalStandard.filter(val => {
      return val['superiorEvaluationValue'];
    })
    this.indexSuperiorAssessment =res.length;
    if( this.indexSuperiorAssessment === this.tieuChi.length && this.checkSelfAssessment === false){
      this.disableBtn1.next(false);
    }else if(this.indexSelfAssessment === this.tieuChi.length && this.checkSelfAssessment === true && this.indexSuperiorAssessment=== this.tieuChi.length){
      this.disableBtn1.next(false);
    }else {
      this.disableBtn1.next(true);
    }
  }

  // event change tự  đánh giá
  changeSelfAssessment(event, dataItem) {
      const newObject = {
        id: dataItem.id,
        careerStandardEvaluationId: this.idEmployee,
        employeeId: this.idEmployee,
        criteriaCode: dataItem.code,
        criteriaValue: dataItem.value,
        criteriaContent: dataItem.description,
        employeeEvaluationValue: event
      }
      const element = this.ProfessionalStandard.find((e) => e.id === dataItem.id);
      if (element === undefined) {
        this.ProfessionalStandard.push(newObject)
      } else {
        this.ProfessionalStandard.map((e) => {
          if (e.id === dataItem.id && event !==this.defaultSelfAssessment) {
            e['employeeEvaluationValue'] = event
          }else if(e.id === dataItem.id && event ===this.defaultSelfAssessment){
            e['employeeEvaluationValue'] = ''
          }
          return e;
        })
      }

    const res = this.ProfessionalStandard.filter(val => {
      return val['employeeEvaluationValue'];
    })
    this.indexSelfAssessment =res.length;
    if( this.indexSelfAssessment === this.tieuChi.length  && this.indexSuperiorAssessment=== this.tieuChi.length){
      this.disableBtn1.next(false);
    }else{
      this.disableBtn1.next(true);
    }
  }

  saveTieuChi(){
    this.loadingPage.next(true);
    this.isLoading$.next(false);
    this.modalService.dismissAll();
    this.CreatProfessionalStandar ={
      employeeId : this.idEmployee,
      employeeSelfAssessmentResult : 'khá',
      superiorSelfAssessmentResult : 'tốt',
      schoolYearId: this.smasContextModel.year.id,
      schoolYear: this.smasContextModel.year.code,
      lstEvaluationHistory: this.ProfessionalStandard,
    }
    this.ProfessionalStander.PostProfessionalStandard(this.CreatProfessionalStandar).subscribe(data =>{
      // @ts-ignore
      this.ProfessionalStandard = [];
      this.indexSelfAssessment=0;
      this.indexSuperiorAssessment=0;
      this.notiService.createSuccess();
      this.loadEvaluateStandardCereer();
      this.disableBtn1.next(true);
    },error => {
      this.loadingPage.next(false);
      this.isLoading$.next(true);
    })
  }
  pageChange(e) {
    this.skip = e.skip;
    this.loadEvaluateStandardCereer();
  }
  pageSizeChange() {
    this.skip = this._pageSize * Math.floor(this.skip / this._pageSize);
    this.loadEvaluateStandardCereer();
  }

  public close() {
    // @ts-ignore
    this.ProfessionalStandard = [];
    this.indexSelfAssessment=0;
    this.indexSuperiorAssessment=0;
    this.modalService.dismissAll();
    this.disableBtn2.next(true);
  }

  openModalDelete(mymodal) {
    this.loadingDelete.next(false);
    this.modalService.open(mymodal,{windowClass : 'myCustomModalClass',centered: true});
    document.getElementById('focusDelete').focus();
  }

  onChange(row: any) {
    this.mySelection=row;
    this.delAllbtn = this.mySelection.length <= 0;
  }
  delete() {
    this.btnConfirm=true;
    this.ProfessionalStander.deleteAllProfessionStandard(this.mySelection).subscribe( data =>{
      this.notiService.deleteSuccess();
      this.isLoading$.next(true);
      this.loadEvaluateStandardCereer();
      this.btnConfirm=false;
      this.modalService.dismissAll();
    }, error => {
    })
  }

  changeSelfAssessmentUpdate123(event, dataItem) {
    this.changeLichSuDanhGia.forEach((e) => {
      if (e.id === dataItem.id && event !==this.defaultSelfAssessment) {
        e['employeeEvaluationValue'] = event
      }else if(e.id === dataItem.id && event ===this.defaultSelfAssessment){
        e['employeeEvaluationValue'] = ''
      }
      return e;
    })
    if(JSON.stringify(this.changeLichSuDanhGia) === JSON.stringify(this.lichSuDanhGia)){
         this.disableBtn2.next(true);
    }else {
      this.disableBtn2.next(false);
    }
  }

  changeSuperiorAssessmentUpdate123(event, dataItem) {
    this.changeLichSuDanhGia.forEach((e) => {
      if (e.id === dataItem.id && event !==this.defaultSelfAssessment) {
        e['superiorEvaluationValue'] = event
      }else if(e.id === dataItem.id && event ===this.defaultSelfAssessment){
        e['superiorEvaluationValue'] = ''
      }
      return e;
    })
      if(JSON.stringify(this.changeLichSuDanhGia) === JSON.stringify(this.lichSuDanhGia)){
          this.disableBtn2.next(true);
      }else {
          this.disableBtn2.next(false);
      }
  }

  saveTieuChiupdate() {
    this.modalService.dismissAll();
    this.historyProfessionalStandardModel={
      employeeId : this.idEmployee,
      employeeSelfAssessmentResult : 'khá',
      superiorSelfAssessmentResult : 'khá',
      schoolYearId: this.smasContextModel.year.id,
      schoolYear: this.smasContextModel.year.code,
      lstEvaluationHistory: this.changeLichSuDanhGia,
    }
    this.ProfessionalStander.updateProfessionStandard(this.IdDanhGia,this.historyProfessionalStandardModel).subscribe(data =>{
      this.notiService.updateSuccess();
      this.loadEvaluateStandardCereer();
      this.disableBtn2.next(true);
    },error => {
    })
  }
}
