import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
// @ts-ignore
import {SchoolInformation} from './../models/schoolInformation';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {ItemDepartmentModel} from '../model/item-department.model';
import {ComparisonOperator, FilterItems, GridParam, SortDirection} from '../model/grid-param';
import {ItemSchoolInformationModel} from '../model/item-school-information.model';

@Injectable({
  providedIn: 'root'
})
export class SchoolInformationService {

  private API = `${environment.API_GATEWAY_ENDPOINT}`;

  private subding: GridParam;

  constructor(private httpClient: HttpClient) { }

  apiGetAll(): Observable<SchoolInformation[]>{
    return this.httpClient.get<SchoolInformation[]>(`${this.API}diem-truong/tat-ca`);
  }

  apiGet(id: string){
    return this.httpClient.get<SchoolInformation[]>(`${this.API}diem-truong/${id}`);
  }

  getDataSubding(skipCount: number, maxResultCount: number): Observable<ItemSchoolInformationModel> {
    this.subding = new GridParam();
    this.subding.sort = 'creationtime';
    this.subding.sortDirection = SortDirection.DESC;
    this.subding.skipCount = skipCount;
    this.subding.maxResultCount = maxResultCount;
    return this.httpClient.post<ItemSchoolInformationModel>(`${this.API}diem-truong/phan-trang`, this.subding);
  }

  apiAdd(createData: SchoolInformation): Observable<SchoolInformation>{
    return this.httpClient.post<SchoolInformation>(`${this.API}diem-truong/tao`, createData);
  }

  apiUpdate(id: string, updateData: SchoolInformation): Observable<SchoolInformation>{
    return this.httpClient.put<SchoolInformation>(`${this.API}diem-truong/sua/${id}`, updateData);
  }

  apiDelete(id: string): Observable<SchoolInformation>{
    return this.httpClient.delete(`${this.API}diem-truong/xoa/${id}`);
  }

  apiDeleteMany(ids: string[]): Observable<SchoolInformation>{
    return this.httpClient.post(`${this.API}diem-truong/xoa-danh-sach`,ids)
  }
}
