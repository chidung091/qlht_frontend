
import {ExamViolationTypeModel} from '../model/exam-violation-type.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {FaultcriteriaStateModel} from './fault-criteria.state';
import {Injectable} from '@angular/core';
import {NotiService} from '../service-model/notification.service';
import {ExamViolationTypeService} from '../service-model/exam-violation-type.service';
import {
  DeleteExam,
  DeleteListExam,
  GetAllExam,
  GetPaginationExam,
  PostExam,
  PutExam
} from '../actions/exam-violation-type.action';
import {locale} from '../../_config/i18n/vi';

export interface ExamViolationTypeStateModel {
  examViolationTypes: ExamViolationTypeModel[],
  totalCount: number;
}

@State<ExamViolationTypeStateModel>({
  name: 'examViolationTypes',
  defaults: {
    examViolationTypes: [],
    totalCount: 0
  }
})
@Injectable()
export class ExamViolationTypeState {
  constructor(private examViolationTypeService: ExamViolationTypeService,
              private notiService: NotiService) {
  }
  @Selector()
  static getAll(state: ExamViolationTypeStateModel){
    return state.examViolationTypes
  }
  @Selector()
  static getTotalCount(state: ExamViolationTypeStateModel){
    return state.totalCount;
  }
  @Action(GetAllExam)
  getAllFault(ctx: StateContext<ExamViolationTypeStateModel>){
    return this.examViolationTypeService.getAllExam().subscribe((result) =>{
      const state = ctx.getState();
      ctx.setState({
        ...state,
        examViolationTypes: result.items
      })
    })
  }
  @Action(PostExam)
  async postExam(ctx: StateContext<ExamViolationTypeStateModel>, {examViolationTypeModel}: PostExam){
    await this.examViolationTypeService.postExam(examViolationTypeModel).toPromise();
  }
  @Action(DeleteExam)
  deleteExam(ctx: StateContext<ExamViolationTypeStateModel>, {id}: DeleteExam){
    return this.examViolationTypeService.deleteExam(id).subscribe(() =>{
        const state = ctx.getState();
        const filterArray = state.examViolationTypes.filter(item => item.id !== id);
        ctx.patchState({
          ...state,
          examViolationTypes: filterArray
        })
        this.notiService.deleteSuccess();
      }
    );
  }
  @Action(PutExam)
  putFault(ctx: StateContext<ExamViolationTypeStateModel>, {id, examViolationTypeModel}: PutExam){
    return this.examViolationTypeService.putExam(id,examViolationTypeModel).subscribe((result) =>{
      const state = ctx.getState()
      const examList = [...state.examViolationTypes]
      const index = examList.findIndex(item => item.id === id);
      examList[index] = result;
      ctx.setState({
        ...state,
        examViolationTypes: examList,
      });
      this.notiService.updateSuccess();
    });
  }
  @Action(DeleteListExam)
  async deleteListExam(ctx: StateContext<ExamViolationTypeStateModel>, {ids}: DeleteListExam){
    await this.examViolationTypeService.deleteListExam(ids).toPromise().then(()=>{
      this.notiService.deleteSuccess();
    })
  }
  @Action(GetPaginationExam)
  getPaginationFault(ctx: StateContext<ExamViolationTypeStateModel>, {keyword,pageSize,skip}: GetPaginationExam){
    return this.examViolationTypeService.getPaginationExam(keyword, pageSize,skip).subscribe((result)=>{
      const state = ctx.getState();
      ctx.setState({
        ...state,
        examViolationTypes: result.items,
        totalCount: result.totalCount
      })
    })
  }
}
