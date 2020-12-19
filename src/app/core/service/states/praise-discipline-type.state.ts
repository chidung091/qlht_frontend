
import {PraiseDisciplineTypeModel} from '../model/praise-discipline-type.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {ConcurrentWorkTypeStateModel} from './concurrent-work-type.state';
import {Injectable} from '@angular/core';
import {NotiService} from '../service-model/notification.service';
import {PraiseDisciplineTypeService} from '../service-model/praise-discipline-type.service';
import {
  DeleteListPD,
  DeletePD,
  GetAllPD,
  GetPaginationPD,
  PostPD,
  PutPD
} from '../actions/praise-discipline-type.action';
import {locale} from '../../_config/i18n/vi';

export interface PraiseDisciplineTypeStateModel {
  praiseDisciplineTypes: PraiseDisciplineTypeModel[],
  totalCount: number;
}
@State<PraiseDisciplineTypeStateModel>({
  name: 'praiseDisciplineTypes',
  defaults: {
    praiseDisciplineTypes: [],
    totalCount: 0
  }
})
@Injectable()
export class PraiseDisciplineTypeState {
  constructor(private praiseDisciplineTypeService: PraiseDisciplineTypeService,
              private notiService: NotiService) {
  }
  @Selector()
  static getAllPD(state: PraiseDisciplineTypeStateModel){
    return state.praiseDisciplineTypes
  }
  @Selector()
  static getTotalCount(state: PraiseDisciplineTypeStateModel){
    return state.totalCount;
  }
  @Action(GetAllPD)
  getAllExp(ctx: StateContext<PraiseDisciplineTypeStateModel>){
    return this.praiseDisciplineTypeService.getAllPD().subscribe((result) =>{
      const state = ctx.getState();
      ctx.setState({
        ...state,
        praiseDisciplineTypes: result.items
      })
    })
  }
  @Action(PostPD)
  async postPD(ctx: StateContext<PraiseDisciplineTypeStateModel>, {praiseDisciplineTypeModel}: PostPD){
    await this.praiseDisciplineTypeService.postPD(praiseDisciplineTypeModel).toPromise();
  }
  @Action(DeletePD)
  deletePD(ctx: StateContext<PraiseDisciplineTypeStateModel>, {id}: DeletePD){
    return this.praiseDisciplineTypeService.deletePD(id).subscribe((result) =>{
        const state = ctx.getState();
        const filterArray = state.praiseDisciplineTypes.filter(item => item.id !== id);
        ctx.patchState({
          ...state,
          praiseDisciplineTypes: filterArray
        })
        this.notiService.deleteSuccess();
      }
    );
  }
  @Action(PutPD)
  putPD(ctx: StateContext<PraiseDisciplineTypeStateModel>, {id, praiseDisciplineTypeModel}: PutPD){
    return this.praiseDisciplineTypeService.putPD(id,praiseDisciplineTypeModel).subscribe((result) =>{
      const state = ctx.getState()
      const pDList = [...state.praiseDisciplineTypes]
      const index = pDList.findIndex(item => item.id === id);
      pDList[index] = result;
      ctx.setState({
        ...state,
        praiseDisciplineTypes: pDList,
      });
      this.notiService.updateSuccess();
    });
  }
  @Action(DeleteListPD)
  async deleteListExp(ctx: StateContext<ConcurrentWorkTypeStateModel>, {ids}: DeleteListPD){
    await this.praiseDisciplineTypeService.deleteListPD(ids).toPromise().then(()=>{
      this.notiService.deleteSuccess();
    })
  }
  @Action(GetPaginationPD)
  getPaginationPD(ctx: StateContext<PraiseDisciplineTypeStateModel>, {keyword, loaiKhenThuongKyLuat, pageSize, skip}: GetPaginationPD) {
    return this.praiseDisciplineTypeService.getPaginationPD(keyword, loaiKhenThuongKyLuat, pageSize, skip).subscribe((result) => {
      const state = ctx.getState();
      ctx.setState({
        ...state,
        praiseDisciplineTypes: result.items,
        totalCount: result.totalCount
      })
    })
  }

}
