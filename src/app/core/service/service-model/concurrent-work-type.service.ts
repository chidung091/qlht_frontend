import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ConcurrentWorkTypeModel} from '../model/concurrent-work-type.model';
import {ComparisonOperator, FilterItems, GridParam, SortDirection} from '../model/grid-param';
import {ItemConcurrentWorkTypeModel} from '../model/item-concurrentworktype.model';
import {Observable} from "rxjs";
import {WorkExperimentalDtosModel} from "../model/work-experimental-dtos.model";

@Injectable({
  providedIn: 'root'
})
export class ConcurrentWorkTypeService {
  private API = `${environment.API_GATEWAY_ENDPOINT}`;
  private inforFind: GridParam;
  constructor(private http: HttpClient) { }
  getAllCon(): Observable<ConcurrentWorkTypeModel[]>{
    return this.http.get<ConcurrentWorkTypeModel[]>(`${this.API}danh-muc-truong/cong-viec-kiem-nhiem/tat-ca`)
  }
  postCon(workExperimentalDtosModel: WorkExperimentalDtosModel){
    return this.http.post<ConcurrentWorkTypeModel>(`${this.API}danh-muc-truong/cong-viec-kiem-nhiem/tao`, workExperimentalDtosModel)
  }

  deleteList(ids: string[]) {
    return this.http.post<ConcurrentWorkTypeModel>(`${this.API}danh-muc-truong/cong-viec-kiem-nhiem/xoa-danh-sach`, ids)
  }
    putCon(id: string, concurrentWorkTypeModel: ConcurrentWorkTypeModel){
      return this.http.put<ConcurrentWorkTypeModel>(`${this.API}danh-muc-truong/cong-viec-kiem-nhiem/sua/${id}`,concurrentWorkTypeModel)
    }
  deleteCon(id: string){
    return this.http.delete<ConcurrentWorkTypeModel>(`${this.API}danh-muc-truong/cong-viec-kiem-nhiem/xoa/${id}`)
  }
  getPagination(keyword: string, pageSize: number, skip: number){
    // if(keyword === undefined){
    //   keyword = '';
    // }
    this.inforFind = new GridParam();
    this.inforFind.sort = 'creationTime';
    this.inforFind.sortDirection = SortDirection.DESC;
    this.inforFind.filterItems = [];
    // this.inforFind.filterItems.push({
    //   value: keyword,
    //   propertyName: 'tenCongViecKiemNhiem',
    //   comparison: ComparisonOperator.Contains
    // } as FilterItems);
    if(keyword){
      const param = {
        value: keyword,
        propertyName: 'name',
        comparison: ComparisonOperator.Contains
      } as FilterItems;
      this.inforFind.filterItems.push(param)
    }
    this.inforFind.skipCount = skip;
    this.inforFind.maxResultCount = pageSize;
    return this.http.post<ItemConcurrentWorkTypeModel>(`${this.API}danh-muc-truong/cong-viec-kiem-nhiem/phan-trang`,this.inforFind)
  }

}
