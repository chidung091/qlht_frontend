import {DistrictModel, ProvinceModel, WardModel} from './location.model';
import {LocationActions, LocationActionTypes} from './location.action';

export interface LocationState {
  allProvinces: ProvinceModel[],
  provinceLoaded: boolean,
  districtsByProvinceCode: DistrictModel[],
  districtLoaded: boolean,
  wardsByDistrictCode: WardModel[],
  wardLoaded: boolean,
}

export const initLocationState: LocationState = {
  allProvinces: undefined,
  provinceLoaded: true,
  districtsByProvinceCode: undefined,
  districtLoaded: true,
  wardsByDistrictCode: undefined,
  wardLoaded: true,
}

export function locationReducer(
  state = initLocationState,
  action: LocationActions
): LocationState {
  switch (action.type) {
    case LocationActionTypes.GetAllProvinces: {
      return {
        ...state,
        provinceLoaded: false,
      }
    }
    case LocationActionTypes.ProvincesLoaded:
      return {
        ...state,
        allProvinces: action.result,
        provinceLoaded: true,
      }
    case LocationActionTypes.GetDistrictByProvinceCode:
      return {
        ...state,
        districtLoaded: false,
      }
    case LocationActionTypes.DistrictLoaded:
      return {
        ...state,
        districtLoaded: true,
        districtsByProvinceCode: action.result
      }
    case LocationActionTypes.GetWardsByDistrictCode:
      return {
        ...state,
        wardLoaded: false,
      }
    case LocationActionTypes.WardLoaded:
      return {
        ...state,
        wardLoaded: true,
        wardsByDistrictCode: action.result
      }
    case LocationActionTypes.ResetWards:
      return {
        ...state,
        wardsByDistrictCode: undefined,
      }
    default: return state;
  }
}
