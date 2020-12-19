import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CatalogModel} from '../model/catalog.model';
import {ListSchoolAttributeModel} from '../model/school-attribute.model';
import {AgencyModel} from '../model/agency.model';
import {Observable} from 'rxjs';
import {Category} from "../../category";

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private API = `${environment.API_GATEWAY_ENDPOINT}`;

  constructor(private http: HttpClient) { }

  getCatalog(categoryCode: string){
    return this.http.get<CatalogModel[]>(`${this.API}danh-muc/loai-danh-muc/${categoryCode}`)
  }

  getCatalogTwo(categoryCode: string, categoryParentCode: string): Observable<CatalogModel[]> {
    if(!categoryParentCode){
      return this.http.get<CatalogModel[]>(`${this.API}danh-muc/loai-danh-muc/${categoryCode}`)
    }else {
      return this.http.get<CatalogModel[]>(`${this.API}danh-muc/loai-danh-muc/${categoryCode}/${categoryParentCode}`)
    }
  }

  getCatalogOne(id: string){
    return this.http.get<CatalogModel>(`${this.API}danh-muc/${id}`)
  }

  getSchoolAttribute() {
    return this.http.get<ListSchoolAttributeModel>(`${this.API}danh-muc/thuoc-tinh-truong`);
  }

  getAgency() {
    return this.http.get<AgencyModel[]>(`${this.API}danh-muc/don-vi/tim-kiem`);
  }
}
