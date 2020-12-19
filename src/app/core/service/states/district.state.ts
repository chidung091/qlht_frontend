import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {tap} from 'rxjs/operators';
import {NotiService} from '../service-model/notification.service';
import {DistrictService} from '../service-model/district.service';
import {DistrictModel} from '../model/district.model';
import {GetDistrict, GetDistrictOfProvince,ResetDistrict} from '../actions/district.action';
import {DeleteMultiple} from '../actions/school-information-action';

@Injectable()
export class DistrictStateModel{
  listDistrict: DistrictModel[];
  selectedData: DistrictModel;
  district: DistrictModel[];
}

@State<DistrictStateModel>({
  name: 'DistrictState',
  defaults: {
    listDistrict: null,
    selectedData: null,
    district: [],
  }
})

@Injectable()
export class DistrictState {
  constructor(private districtService: DistrictService,
              private notiService: NotiService) {
  }

  @Selector()
  static getList(state: DistrictStateModel): DistrictModel[]{
    return state.listDistrict;
  }

  @Selector()
  static getDistrict(state: DistrictStateModel): DistrictModel[]{
    return state.district;
  }

  @Action(GetDistrictOfProvince)
  getData({getState , setState}: StateContext<DistrictStateModel>, {idProvince}: GetDistrictOfProvince){
    return this.districtService.apiGetAllDistrictByIdProvince(idProvince).pipe(tap((result) => {
      const state = getState();
      setState({
        ...state,
        listDistrict: result.items
      });
    }));
  }

  @Action(GetDistrict)
  getDistrict({getState , setState}: StateContext<DistrictStateModel>, {maHuyen}: GetDistrict) {
    return this.districtService.getDistrict(maHuyen).pipe(tap((result) => {
      const state = getState();
      setState({
        ...state,
        district: [result]
      });
    }))
  }

  @Action(ResetDistrict)
  resetDistrict({getState , setState}: StateContext<DistrictStateModel>){
    const state = getState()
    setState({
      ...state,
      listDistrict: undefined
    })
  }
}
