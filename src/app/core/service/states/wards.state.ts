import {WardsModel} from '../model/wards.model';
import {GetWard, GetWardsOfDistrict, ResetWard} from '../actions/ward.action';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {WardsService} from '../service-model/wards.service';
import {tap} from 'rxjs/operators';

export interface WardsStateModel {
  wardsOfDistrict: WardsModel[];
  ward: WardsModel[]
}

@State<WardsStateModel>({
  name: 'wards',
  defaults: {
    wardsOfDistrict: [],
    ward: []
  }
})
@Injectable()
export class WardsState {
  constructor(private wardsService: WardsService) {
  }

  @Selector()
  static getWardsOfDistrict(state: WardsStateModel) {
    return state.wardsOfDistrict;
  }

  @Selector()
  static getWard(state: WardsStateModel) {
    return state.ward;
  }

  @Action(GetWardsOfDistrict)
  getWardsOfDistrict(ctx: StateContext<WardsStateModel>, {maHuyen}: GetWardsOfDistrict) {
    return this.wardsService.getWardsOfDistrict(maHuyen).pipe(tap(result => {
      const state = ctx.getState();
      ctx.setState({
        ...state,
        wardsOfDistrict: result.items
      })
    }));
  }

  @Action(GetWard)
  getWard(ctx: StateContext<WardsStateModel>, {maXa}: GetWard) {
    return this.wardsService.getWard(maXa).pipe(tap(result => {
      const state = ctx.getState();
      ctx.setState({
        ...state,
        ward: [result]
      })
    }));
  }

  @Action(ResetWard)
  ResetWard(ctx: StateContext<WardsStateModel>) {
    const state = ctx.getState();
    return ctx.setState({
      ...state,
      wardsOfDistrict: undefined
    })
  }
}
