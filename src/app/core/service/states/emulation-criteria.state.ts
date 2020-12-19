import {EmulationCriteriaModel} from '../model/emulation-criteria.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {ConcurrentWorkTypeStateModel} from './concurrent-work-type.state';
import {Injectable} from '@angular/core';

import {NotiService} from '../service-model/notification.service';
import {EmulationCriteriaService,} from '../service-model/emulation-criteria.service';
import {
  DeleteEmu,
  DeleteListEmu,
  GetAllEmu,
  GetPaginationEmu,
  PostEmu,
  PutEmu
} from '../actions/emulation-criteria.action';
import { GetPaginationCon} from '../actions/concurrent-work-type.action';
import {locale} from '../../_config/i18n/vi';

export interface EmulationCriteriaStateModel {
  emulationCriterias: EmulationCriteriaModel[],
  totalCount: number;
}
@State<EmulationCriteriaStateModel>({
  name: 'emulationCriterias',
  defaults: {
    emulationCriterias: [],
    totalCount: 0
  }
})
@Injectable()
export class EmulationCriteriaState {
  constructor(private emulationCriteriaService: EmulationCriteriaService,
              private notiService: NotiService) {
  }
  @Selector()
  static getAllEmu(state: EmulationCriteriaStateModel){
    return state.emulationCriterias
  }
  @Selector()
  static getTotalCount(state: EmulationCriteriaStateModel){
    return state.totalCount;
  }
  @Action(GetAllEmu)
  getAllEmu(ctx: StateContext<EmulationCriteriaStateModel>){
    return this.emulationCriteriaService.getAllEmu().subscribe((result) =>{
      const state = ctx.getState();
      ctx.setState({
        ...state,
        emulationCriterias: result.items
      })
    })
  }
  @Action(PostEmu)
  async postEmu(ctx: StateContext<ConcurrentWorkTypeStateModel>, {emulationCriteriaModel}: PostEmu){
    await this.emulationCriteriaService.postEmu(emulationCriteriaModel).toPromise();
  }
  @Action(DeleteEmu)
  deleteExp(ctx: StateContext<EmulationCriteriaStateModel>, {id}: DeleteEmu){
    return this.emulationCriteriaService.deleteEmu(id).subscribe((result) =>{
        const state = ctx.getState();
        const filterArray = state.emulationCriterias.filter(item => item.id !== id);
        ctx.patchState({
          ...state,
          emulationCriterias: filterArray
        })
        this.notiService.deleteSuccess();
      }
    );
  }
  @Action(PutEmu)
  putEmu(ctx: StateContext<EmulationCriteriaStateModel>, {id, emulationCriteriaModel}: PutEmu){
    return this.emulationCriteriaService.putEmu(id,emulationCriteriaModel).subscribe((result) =>{
      const state = ctx.getState()
      const emuList = [...state.emulationCriterias]
      const index = emuList.findIndex(item => item.id === id);
      emuList[index] = result;
      ctx.setState({
        ...state,
        emulationCriterias: emuList,
      });
      this.notiService.updateSuccess();
    });
  }
  @Action(DeleteListEmu)
  async deleteListEmu(ctx: StateContext<EmulationCriteriaStateModel>, {ids}: DeleteListEmu){
    await this.emulationCriteriaService.deleteListEmu(ids).toPromise().then(()=>{
      this.notiService.deleteSuccess();
    })
  }
  @Action(GetPaginationCon)
  getPagination(ctx: StateContext<EmulationCriteriaStateModel>, {keyword,pageSize,skip}: GetPaginationEmu){
    return this.emulationCriteriaService.getPaginationEmu(keyword, pageSize,skip).subscribe((result)=>{
      const state = ctx.getState();
      ctx.setState({
        ...state,
        emulationCriterias: result.items,
        totalCount: result.totalCount
      })
    })
  }
}
