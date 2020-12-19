
import {RewardFinalModel} from '../model/reward-final.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {NotiService} from '../service-model/notification.service';
import {RewardFinalService} from '../service-model/reward-final.service';
import {DeleteListRF, DeleteRF, GetAllRF, GetPaginationRF, PostRF, PutRF, SetRF} from '../actions/reward-final.action';
import {locale} from '../../_config/i18n/vi';

export interface RewardFinalStateModel {
  rewardFinals: RewardFinalModel[];
  totalCount: number;
  setRewardFinal: RewardFinalModel;
}
@State<RewardFinalStateModel>({
  name: 'rewardFinals',
  defaults: {
    rewardFinals: [],
    totalCount: 0,
    setRewardFinal: null
  }
})
@Injectable()
export class RewardFinalState {
  constructor(private rewardFinalService: RewardFinalService,
              private notiService: NotiService) {
  }
  @Selector()
  static getAllRF(state: RewardFinalStateModel) {
    return state.rewardFinals
  }

  @Selector()
  static getTotalCount(state: RewardFinalStateModel) {
    return state.totalCount;
  }
  @Selector()
  static setRF(state: RewardFinalStateModel){
    return state.setRewardFinal
  }
  @Action(GetAllRF)
  getAllRF(ctx: StateContext<RewardFinalStateModel>) {
    return this.rewardFinalService.getAllRF().subscribe((result) => {
      const state = ctx.getState();
      ctx.setState({
        ...state,
        rewardFinals: result.items
      })
    })
  }
  @Action(PostRF)
  async postRF(ctx: StateContext<RewardFinalStateModel>, {rewardFinalModel}: PostRF) {
    await this.rewardFinalService.postRF(rewardFinalModel).toPromise();
  }

  @Action(DeleteRF)
  deleteRF(ctx: StateContext<RewardFinalStateModel>, {id}: DeleteRF) {
    return this.rewardFinalService.deleteRF(id).subscribe((result) => {
        const state = ctx.getState();
        const filterArray = state.rewardFinals.filter(item => item.id !== id);
        ctx.patchState({
          ...state,
          rewardFinals: filterArray
        })
        this.notiService.deleteSuccess();
      }
    );
  }
  @Action(PutRF)
  putRF(ctx: StateContext<RewardFinalStateModel>, {id, rewardFinalModel}: PutRF) {
    return this.rewardFinalService.putRF(id,rewardFinalModel).subscribe((result) => {
      const state = ctx.getState()
      const rFList = [...state.rewardFinals]
      const index = rFList.findIndex(item => item.id === id);
      rFList[index] = result;
      ctx.setState({
        ...state,
        rewardFinals: rFList,
      });
      this.notiService.updateSuccess();
    });
  }
  @Action(DeleteListRF)
  async deleteListRF(ctx: StateContext<RewardFinalStateModel>, {ids}: DeleteListRF) {
    await this.rewardFinalService.deleteListRF(ids).toPromise().then(() => {
      this.notiService.deleteSuccess();
    })
  }
  @Action(GetPaginationRF)
  getPaginationRF(ctx: StateContext<RewardFinalStateModel>, {keyword, pageSize, skip}: GetPaginationRF) {
    return this.rewardFinalService.getPaginationRF(keyword, pageSize, skip).subscribe((result) => {
      const state = ctx.getState();
      ctx.setState({
        ...state,
        rewardFinals: result.items,
        totalCount: result.totalCount
      })
    })
  }
  @Action(SetRF)
  setRF(ctx: StateContext<RewardFinalStateModel>, {rewardFinalModel}: SetRF){
    const state = ctx.getState();
    ctx.setState({
      ...state,
      setRewardFinal: rewardFinalModel
    })
  }
}
