import {ConcurrentWorkTypeModel} from '../model/concurrent-work-type.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ConcurrentWorkTypeService} from '../service-model/concurrent-work-type.service';
import {NotiService} from '../service-model/notification.service';
import {
  DeleteCon,
  DeleteListCon,
  GetAllCon,
  GetPaginationCon,
  PostCon,
  PutCon
} from '../actions/concurrent-work-type.action';
import {locale} from '../../_config/i18n/vi';

export interface ConcurrentWorkTypeStateModel {
  concurrentWorkTypes: ConcurrentWorkTypeModel[],
  totalCount: number;
}

@State<ConcurrentWorkTypeStateModel>({
  name: 'concurrentWorkTypes',
  defaults: {
    concurrentWorkTypes: [],
    totalCount: 0
  }
})
@Injectable()
export class ConcurrentWorkTypeState {
  constructor(private concurrentWorkTypeService: ConcurrentWorkTypeService,
              private notiService: NotiService) {
  }

  @Selector()
  static getAll(state: ConcurrentWorkTypeStateModel) {
    return state.concurrentWorkTypes;
  }

  @Selector()
  static getTotalCount(state: ConcurrentWorkTypeStateModel) {
    return state.totalCount;
  }

  @Action(GetAllCon)
  getAllCon(ctx: StateContext<ConcurrentWorkTypeStateModel>) {
    return this.concurrentWorkTypeService.getAllCon().subscribe((result) => {
      const state = ctx.getState();
      ctx.setState({
        ...state,
        concurrentWorkTypes: result
      })
    })
  }

  // @Action(PostCon)
  // async postExp(ctx: StateContext<ConcurrentWorkTypeStateModel>, {concurrentWorkTypeModel}: PostCon) {
  //   await this.concurrentWorkTypeService.postCon(concurrentWorkTypeModel).toPromise();
  // }

  @Action(DeleteCon)
  deleteExp(ctx: StateContext<ConcurrentWorkTypeStateModel>, {id}: DeleteCon) {
    return this.concurrentWorkTypeService.deleteCon(id).subscribe((result) => {
        const state = ctx.getState();
        const filterArray = state.concurrentWorkTypes.filter(item => item.id !== id);
        ctx.patchState({
          ...state,
          concurrentWorkTypes: filterArray
        })
        this.notiService.deleteSuccess();
      }
    );
  }

  @Action(PutCon)
  putExp(ctx: StateContext<ConcurrentWorkTypeStateModel>, {id, concurrentWorkTypeModel}: PutCon) {
    return this.concurrentWorkTypeService.putCon(id, concurrentWorkTypeModel).subscribe((result) => {
      const state = ctx.getState()
      const conList = [...state.concurrentWorkTypes]
      const index = conList.findIndex(item => item.id === id);
      conList[index] = result;
      ctx.setState({
        ...state,
        concurrentWorkTypes: conList,
      });
      this.notiService.updateSuccess();
    });
  }

  @Action(DeleteListCon)
  async deleteListExp(ctx: StateContext<ConcurrentWorkTypeStateModel>, {ids}: DeleteListCon) {
    await this.concurrentWorkTypeService.deleteList(ids).toPromise().then(() => {
      this.notiService.deleteSuccess();
    })
  }

  @Action(GetPaginationCon)
  getPagination(ctx: StateContext<ConcurrentWorkTypeStateModel>, {keyword, pageSize, skip}: GetPaginationCon) {
    return this.concurrentWorkTypeService.getPagination(keyword, pageSize, skip).subscribe((result) => {
      const state = ctx.getState();
      ctx.setState({
        ...state,
        concurrentWorkTypes: result.items,
        totalCount: result.totalCount
      })
    })
  }
}
