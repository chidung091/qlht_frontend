import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {LocationService} from './location.service';
import {
  DistrictLoaded,
  GetAllProvinces,
  GetDistrictByProvinceCode,
  GetWardsByDistrictCode,
  LocationActionTypes,
  ProvincesLoaded, WardLoaded
} from './location.action';
import {map, mergeMap} from 'rxjs/operators';
import {ListResultDto} from '../../views/pages/admin/model/dtos';
import {DistrictModel, ProvinceModel, WardModel} from './location.model';

@Injectable()
export class LocationEffect {

  @Effect()
  getAllProvince$ = this.actions$.pipe(
    ofType<GetAllProvinces>(LocationActionTypes.GetAllProvinces),
    mergeMap(() => this.service.getAllProvinces()),
    map((result: ListResultDto<ProvinceModel>) => {
      return new ProvincesLoaded(result.items);
    })
  );

  @Effect()
  getDistrictsByProvinceCode$ = this.actions$.pipe(
    ofType<GetDistrictByProvinceCode>(LocationActionTypes.GetDistrictByProvinceCode),
    mergeMap(({provinceCode}) => this.service.getDistrictByProvinceCode(provinceCode)),
    map((result: ListResultDto<DistrictModel>) => {
      return new DistrictLoaded(result.items);
    })
  );

  @Effect()
  getWardsByDistrictCode$ = this.actions$.pipe(
    ofType<GetWardsByDistrictCode>(LocationActionTypes.GetWardsByDistrictCode),
    mergeMap(({districtCode}) => this.service.getWardByDistrictCode(districtCode)),
    map((result: ListResultDto<WardModel>) => {
      return new WardLoaded(result.items);
    })
  );

  constructor(private actions$: Actions,
              private service: LocationService,
  ) {}

}
