
import {ExperienceTypeModel} from '../model/experience-type.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {NotiService} from '../service-model/notification.service';
import {ExperienceTypeService} from '../service-model/experience-type.service';
import {
  DeleteExper,
  DeleteListExper,
  GetAllExper,
  GetPaginationExper,
  PostExper,
  PutExper, SetSelectedExper
} from '../actions/experience-type.action';
import {tap} from 'rxjs/operators';
import {locale} from '../../_config/i18n/vi';

export interface ExperiencetypeStateModel {
  experienceTypes: ExperienceTypeModel[],
  totalCount: number;
  selectedExper: ExperienceTypeModel;
}
@State<ExperiencetypeStateModel>({
  name: 'experienceTypes',
  defaults: {
    experienceTypes: [],
    totalCount: 0,
    selectedExper: null
  }
})
@Injectable()
export class ExperienceTypeState {
  constructor(private experienceTypeService: ExperienceTypeService,
              private notiService: NotiService) {
  }

  @Selector()
  static getAllExper(state: ExperiencetypeStateModel) {
    return state.experienceTypes
  }

  @Selector()
  static getTotalCountExper(state: ExperiencetypeStateModel) {
    return state.totalCount;
  }
  @Selector()
  static getSelectedExper(state: ExperiencetypeStateModel) {
    return state.selectedExper;
  }

  // @Action(GetAllExper)
  // getAllExper(ctx: StateContext<ExperiencetypeStateModel>) {
  //   return this.experienceTypeService.getAllExper().pipe(tap(result) => {
  //     const state = ctx.getState();
  //     ctx.setState({
  //       ...state,
  //       experienceTypes: result,
  //     })
  //     console.log(state, 'sate tét');
  //     console.log('result tét', result);
  //     console.log('experiences', this.experienceTypeService.getAllExper())
  //   })
  // }

  @Action(GetAllExper)
  getData({getState , setState}: StateContext<ExperiencetypeStateModel>){
    return this.experienceTypeService.getAllExper().pipe(tap((result) => {
      const state = getState();
      setState({
        ...state,
        experienceTypes: result
      });
    }));
  }

  @Action(PostExper)
  async postExper(ctx: StateContext<ExperiencetypeStateModel>, {experienceTypeModel}: PostExper) {
    await this.experienceTypeService.postExper(experienceTypeModel).toPromise();
  }

  @Action(DeleteExper)
  deleteExper(ctx: StateContext<ExperiencetypeStateModel>, {id}: DeleteExper) {
    return this.experienceTypeService.deleteExper(id).subscribe((result) => {
        const state = ctx.getState();
        const filterArray = state.experienceTypes.filter(item => item.id !== id);
        ctx.patchState({
          ...state,
          experienceTypes: filterArray
        })
        this.notiService.deleteSuccess();
      }
    );
  }

  @Action(PutExper)
  putExper(ctx: StateContext<ExperiencetypeStateModel>, {id, experienceTypeModel}: PutExper) {
    return this.experienceTypeService.putExper(id, experienceTypeModel).subscribe((result) => {
      const state = ctx.getState()
      const experList = [...state.experienceTypes]
      const index = experList.findIndex(item => item.id === id);
      experList[index] = result;
      ctx.setState({
        ...state,
        experienceTypes: experList,
      });
      // this.notiService.showNoti('Cập nhật thành công', 'success');
    });
  }

  @Action(DeleteListExper)
  async deleteListExper(ctx: StateContext<ExperiencetypeStateModel>, {ids}: DeleteListExper) {
    await this.experienceTypeService.deleteListExper(ids).toPromise().then(() => {
      this.notiService.deleteSuccess();
    })
  }

  @Action(GetPaginationExper)
  getPaginationExper(ctx: StateContext<ExperiencetypeStateModel>, {keyword, pageSize, skip}: GetPaginationExper) {
    return this.experienceTypeService.getPaginationExper(keyword, pageSize, skip).subscribe((result) => {
      const state = ctx.getState();
      ctx.setState({
        ...state,
        experienceTypes: result.items,
        totalCount: result.totalCount
      })
    })

  }
  @Action(SetSelectedExper)
  setSelectedExper(ctx: StateContext<ExperiencetypeStateModel>,{experienceTypeModel}: SetSelectedExper){
    const state = ctx.getState();
    ctx.setState({
      ...state,
      selectedExper: experienceTypeModel
    })
  }
}
