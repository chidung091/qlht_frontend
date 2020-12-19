import {Injectable} from '@angular/core';
import {environment as env} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DistrictModel, ProvinceModel, WardModel} from './location.model';
import {ListResultDto} from '../../views/pages/admin/model/dtos';

@Injectable({providedIn: 'root'})
export class LocationService {
  private resourceUrl = env.API_GATEWAY_ENDPOINT + 'danh-muc/';

  constructor(
    private http: HttpClient
  ) {
  }

  getAllProvinces(): Observable<ListResultDto<ProvinceModel>> {
    return this.http.get<ListResultDto<ProvinceModel>>(this.resourceUrl + `tinh-thanh/tat-ca`);
  }

  getDistrictByProvinceCode(provinceCode: string): Observable<ListResultDto<DistrictModel>> {
    return this.http.get<ListResultDto<DistrictModel>>(this.resourceUrl + `quan-huyen/${provinceCode}`);
  }

  getWardByDistrictCode(districtCode: string): Observable<ListResultDto<WardModel>> {
    return this.http.get<ListResultDto<WardModel>>(this.resourceUrl+ `xa-phuong/${districtCode}`);
  }
}
