import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {ComparisonOperator, FilterItems, GridParam, SortDirection} from '../model/grid-param';
import {ItemFaultCriteria} from '../model/item-fault-criteria';
import {FaultCriteriaModel} from '../model/fault-criteria.model';



@Injectable({
  providedIn: 'root'
})
export class FaultCriteriaService {
  private API = `${environment.API_GATEWAY_ENDPOINT}`;
  private inforFind: GridParam;
  constructor(private http: HttpClient) { }
  getAllFault(){
    return this.http.get<FaultCriteriaModel[]>(`${this.API}danh-muc-truong/loi-vi-pham/tat-ca`)
  }
  postFault(faultCriteriaModel: FaultCriteriaModel){
    return this.http.post<FaultCriteriaModel>(`${this.API}danh-muc-truong/loi-vi-pham/tao`, faultCriteriaModel)
  }
  deleteListFault(ids: string[]){
    return this.http.post<FaultCriteriaModel>(`${this.API}danh-muc-truong/loi-vi-pham/xoa-danh-sach`, ids)
  }
  putFault(id: string, faultCriteriaModel: FaultCriteriaModel){
    return this.http.put<FaultCriteriaModel>(`${this.API}danh-muc-truong/loi-vi-pham/sua/${id}`,faultCriteriaModel)
  }
  deleteFault(id: string){
    return this.http.delete<FaultCriteriaModel>(`${this.API}danh-muc-truong/loi-vi-pham/xoa/${id}`)
  }
  getPaginationFault(keyword: string, pageSize: number, skip: number){
    this.inforFind = new GridParam();
    this.inforFind.sort = 'creationTime';
    this.inforFind.sortDirection = SortDirection.DESC;
    this.inforFind.filterItems = [];
    if(keyword){
      const params = {
        value: keyword,
        propertyName: 'name',
        comparison: ComparisonOperator.Contains
      } as FilterItems;
      this.inforFind.filterItems.push(params)
    }
    // if(nhomLoiViPhamId){
    //   const params1 = {
    //     value: nhomLoiViPhamId,
    //     propertyName: 'nhomLoiViPhamId',
    //     comparison: ComparisonOperator.Equal
    //   }
    //   this.inforFind.filterItems.push(params1)
    // }
    this.inforFind.skipCount = skip;
    this.inforFind.maxResultCount = pageSize;
    return this.http.post<ItemFaultCriteria>(`${this.API}danh-muc-truong/loi-vi-pham/phan-trang`, this.inforFind);
  }
}
