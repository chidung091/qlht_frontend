import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {tap} from 'rxjs/operators';
import {NotiService} from '../service-model/notification.service';
import {ProvinceModel} from '../model/province.model';
import {ProvinceData, ProvinceService} from '../service-model/province.service';
import {GetAllProvince, GetProvince} from '../actions/province.action';

@Injectable()
export class ProvinceStateModel{
  allProvinces: ProvinceModel[];
  selectedData: ProvinceModel;
  province: ProvinceModel[];
}

@State<ProvinceStateModel>({
  name: 'ProvinceState',
  defaults: {
    allProvinces: null,
    selectedData: null,
    province: null,
  }
})

@Injectable()
export class ProvinceState {
  constructor(private provinceService: ProvinceService,
              private notiService: NotiService) {
  }

  @Selector()
  static getAllProvince(state: ProvinceStateModel): ProvinceModel[]{
    return state.allProvinces;
  }

  @Selector()
  static getProvince(state: ProvinceStateModel) : ProvinceModel[] {
    return state.province;
  }

  @Action(GetAllProvince)
  getData({getState , setState}: StateContext<ProvinceStateModel>){
    return this.provinceService.apiGetAllProvince().pipe(tap((result) => {
      const state = getState();
      // @ts-ignore
      setState({
        ...state,
        allProvinces: result.items
      });
    }));
  }

  @Action(GetProvince)
  getProvince({getState , setState}: StateContext<ProvinceStateModel>, {maTp} :GetProvince) {
    return this.provinceService.getProvince(maTp).pipe(tap((result) => {
      const state = getState();
      // @ts-ignore
      setState({
        ...state,
        province: [result]
      });
    }));
  }
}
