import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {ComparisonOperator, FilterItems, GridParam, SortDirection} from '../model/grid-param';
import {HttpClient} from '@angular/common/http';
import {ItemConcurrentWorkTypeModel} from '../model/item-concurrentworktype.model';
import {ItemExperienceTypeModel} from '../model/item-experience-type.model';
import {ExperienceTypeModel} from '../model/experience-type.model';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExperienceTypeService {
  private API = `${environment.API_GATEWAY_ENDPOINT}`;
  private inforFind: GridParam;
  constructor(private http: HttpClient) { }
  getAllExper(): Observable<ExperienceTypeModel[]>{
    return this.http.get<ExperienceTypeModel[]>(`${this.API}danh-muc-truong/sang-kien-kinh-nghiem/tat-ca`)
  }
  postExper(experienceTypeModel: ExperienceTypeModel){
    return this.http.post<ExperienceTypeModel>(`${this.API}danh-muc-truong/sang-kien-kinh-nghiem/tao`, experienceTypeModel)
  }
  deleteListExper(ids: string[]){
    return this.http.post<ExperienceTypeModel>(`${this.API}danh-muc-truong/sang-kien-kinh-nghiem/xoa-danh-sach`, ids)
  }
  putExper(id: string, experienceTypeModel: ExperienceTypeModel){
    return this.http.put<ExperienceTypeModel>(`${this.API}danh-muc-truong/sang-kien-kinh-nghiem/sua/${id}`,experienceTypeModel)
  }
  deleteExper(id: string){
    return this.http.delete<ExperienceTypeModel>(`${this.API}danh-muc-truong/sang-kien-kinh-nghiem/xoa/${id}`)
  }
  getPaginationExper(keyword: string, pageSize: number, skip: number){
    // if(keyword === undefined){
    //   keyword = '';
    // }
    this.inforFind = new GridParam();
    this.inforFind.sort = 'creationTime';
    this.inforFind.sortDirection = SortDirection.DESC;
    this.inforFind.filterItems = [];
    if (keyword) {
      const params = {
        value: keyword,
        propertyName: 'name',
        comparison: ComparisonOperator.Contains
      } as FilterItems;
      this.inforFind.filterItems.push(params)
    }
    // this.inforFind.filterItems.push({
    //   value: keyword,
    //   propertyName: 'tenSangKienKinhNghiem',
    //   comparison: ComparisonOperator.Contains
    // } as FilterItems);
    this.inforFind.skipCount = skip;
    this.inforFind.maxResultCount = pageSize;
    return this.http.post<ItemConcurrentWorkTypeModel>(`${this.API}danh-muc-truong/sang-kien-kinh-nghiem/phan-trang`,this.inforFind)
  }
}
