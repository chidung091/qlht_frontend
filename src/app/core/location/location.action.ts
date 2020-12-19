import {Action} from '@ngrx/store';
import {DistrictModel, ProvinceModel, WardModel} from './location.model';

export enum LocationActionTypes {
  GetAllProvinces = '[Location] Get all provinces',
  ProvincesLoaded = '[Location] Provinces loaded',
  GetDistrictByProvinceCode = '[Location] Get districts by province code',
  DistrictLoaded = '[Location] Districts loaded',
  GetWardsByDistrictCode = '[Location] Get wards by district code',
  WardLoaded = '[Location] Ward loaded',
  ResetWards = '[Location] Reset ward',
}

export class GetAllProvinces implements Action  {
  readonly type = LocationActionTypes.GetAllProvinces;
}

export class ProvincesLoaded implements Action {
  readonly type = LocationActionTypes.ProvincesLoaded;
  constructor(public result: ProvinceModel[]) {
  }
}

export class GetDistrictByProvinceCode implements Action {
  readonly type = LocationActionTypes.GetDistrictByProvinceCode;
  constructor(public provinceCode: string) {}
}

export class DistrictLoaded implements Action {
  readonly type = LocationActionTypes.DistrictLoaded;
  constructor(public result: DistrictModel[]) {
  }
}

export class GetWardsByDistrictCode implements Action {
  readonly type = LocationActionTypes.GetWardsByDistrictCode;
  constructor(public districtCode: string) {}
}

export class WardLoaded implements Action {
  readonly type = LocationActionTypes.WardLoaded;
  constructor(public result: WardModel[]) {
  }
}

export class ResetWards implements Action {
  readonly type = LocationActionTypes.ResetWards;
}

export type LocationActions = GetAllProvinces | ProvincesLoaded |
  GetDistrictByProvinceCode | DistrictLoaded | GetWardsByDistrictCode | WardLoaded |
  ResetWards
