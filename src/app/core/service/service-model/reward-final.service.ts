import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {ComparisonOperator, FilterItems, GridParam, SortDirection} from '../model/grid-param';
import {HttpClient} from '@angular/common/http';
import {ItemRewardFinalModel} from '../model/item-reward-final.model';
import {RewardFinalModel} from '../model/reward-final.model';

@Injectable({
  providedIn: 'root'
})
export class RewardFinalService {
  private API = `${environment.API_GATEWAY_ENDPOINT}`;
  private inforFind: GridParam;
  constructor(private http: HttpClient) { }
  getAllRF(){
    return this.http.get<ItemRewardFinalModel>(`${this.API}danh-muc-truong​/khen-thuong-cuoi-ky​/tat-ca`)
  }
  postRF(rewardFinalModel: RewardFinalModel){
    return this.http.post<RewardFinalModel>(`${this.API}danh-muc-truong/khen-thuong-cuoi-ky/tao`, rewardFinalModel)
  }
  deleteListRF(ids: string[]) {
    return this.http.post<RewardFinalModel>(`${this.API}danh-muc-truong/khen-thuong-cuoi-ky/xoa-danh-sach`, ids)
  }
  putRF(id: string, rewardFinalModel: RewardFinalModel){
    return this.http.put<RewardFinalModel>(`${this.API}danh-muc-truong/khen-thuong-cuoi-ky/sua/${id}`,rewardFinalModel)
  }
  deleteRF(id: string){
    return this.http.delete<RewardFinalModel>(`${this.API}danh-muc-truong/khen-thuong-cuoi-ky/xoa/${id}`)
  }
  getPaginationRF(keyword: string, pageSize: number, skip: number){
    // if(keyword === undefined){
    //   keyword = '';
    // }
    this.inforFind = new GridParam();
    this.inforFind.sort = 'creationTime';
    this.inforFind.sortDirection = SortDirection.DESC;
    this.inforFind.filterItems = [];
    if(keyword){
      const params = {
        value: keyword,
          propertyName: 'rewardMode',
          comparison: ComparisonOperator.Contains
      } as FilterItems
      this.inforFind.filterItems.push(params)
    }
    this.inforFind.skipCount = skip;
    this.inforFind.maxResultCount = pageSize;
    return this.http.post<ItemRewardFinalModel>(`${this.API}danh-muc-truong/khen-thuong-cuoi-ky/phan-trang`,this.inforFind)
  }
}

