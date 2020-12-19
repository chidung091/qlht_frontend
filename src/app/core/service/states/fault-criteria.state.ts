import {FaultCriteriaModel} from '../model/fault-criteria.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {NotiService} from '../service-model/notification.service';
import {FaultCriteriaService} from '../service-model/fault-criteria.service';
import {
  DeleteFault,
  DeleteListFault,
  GetAllFault,
  GetPaginationFault,
  PostFault,
  PutFault
} from '../actions/fault-criteria.action';
import {tap} from "rxjs/operators";
import {locale} from '../../_config/i18n/vi';


export interface FaultcriteriaStateModel {
  faultCriterias: FaultCriteriaModel[],
  totalCount: number;
}
@State<FaultcriteriaStateModel>({
  name: 'faultCriterias',
  defaults: {
    faultCriterias: [],
    totalCount: 0
  }
})
@Injectable()
export class FaultCriteriaState {
  constructor(private faultCriteriaService: FaultCriteriaService,
              private notiService: NotiService) {
  }
  @Selector()
  static getAllFault(state: FaultcriteriaStateModel){
    return state.faultCriterias
  }
  @Selector()
  static getTotalCount(state: FaultcriteriaStateModel){
    return state.totalCount;
  }
  @Action(GetAllFault)
  getAllFault(ctx: StateContext<FaultcriteriaStateModel>){
    return this.faultCriteriaService.getAllFault().pipe(tap((result) =>{
      const state = ctx.getState();
      ctx.setState({
        ...state,
        faultCriterias: result
      })
    }))
  }
  @Action(PostFault)
  async postFault(ctx: StateContext<FaultcriteriaStateModel>, {faultCriteriaModel}: PostFault){
    await this.faultCriteriaService.postFault(faultCriteriaModel).toPromise();
  }
  @Action(DeleteFault)
  deleteFault(ctx: StateContext<FaultcriteriaStateModel>, {id}: DeleteFault){
    return this.faultCriteriaService.deleteFault(id).subscribe(() =>{
        const state = ctx.getState();
        const filterArray = state.faultCriterias.filter(item => item.id !== id);
        ctx.patchState({
          ...state,
          faultCriterias: filterArray
        })
        this.notiService.deleteSuccess();
      }
    );
  }
  @Action(PutFault)
  putFault(ctx: StateContext<FaultcriteriaStateModel>, {id, faultCriteriaModel}: PutFault){
    return this.faultCriteriaService.putFault(id,faultCriteriaModel).subscribe((result) =>{
      const state = ctx.getState()
      const faultList = [...state.faultCriterias]
      const index = faultList.findIndex(item => item.id === id);
      faultList[index] = result;
      ctx.setState({
        ...state,
        faultCriterias: faultList,
      });
      this.notiService.updateSuccess();
    });
  }
  @Action(DeleteListFault)
  async deleteListFault(ctx: StateContext<FaultcriteriaStateModel>, {ids}: DeleteListFault){
    await this.faultCriteriaService.deleteListFault(ids).toPromise().then(()=>{
      this.notiService.deleteSuccess();
    })
  }
  @Action(GetPaginationFault)
  getPaginationFault(ctx: StateContext<FaultcriteriaStateModel>, {keyword,nameManagement,pageSize,skip}: GetPaginationFault){
    return this.faultCriteriaService.getPaginationFault(keyword, pageSize,skip).subscribe((result)=>{
      const state = ctx.getState();
      ctx.setState({
        ...state,
        faultCriterias: result.items,
        totalCount: result.totalCount
      })
    })
  }
}
