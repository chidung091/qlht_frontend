import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {ComparisonOperator, FilterItems, GridParam, SortDirection} from '../model/grid-param';
import {HttpClient} from '@angular/common/http';
import {ItemConcurrentWorkTypeModel} from '../model/item-concurrentworktype.model';
import {ItemEmulationCriteriaModel} from '../model/item-emulation-criteria.model';
import {EmulationCriteriaModel} from '../model/emulation-criteria.model';

@Injectable({
  providedIn: 'root'
})
export class EmulationCriteriaService {
  private API = `${environment.API_GATEWAY_ENDPOINT}`;
  private inforFind: GridParam;
  constructor(private http: HttpClient) { }
  getAllEmu(){
    return this.http.get<ItemEmulationCriteriaModel>(`${this.API}danh-muc-truong/loai-diem-thi-dua/tat-ca`)
  }
  postEmu(emulationCriteriaModel: EmulationCriteriaModel){
    return this.http.post<EmulationCriteriaModel>(`${this.API}danh-muc-truong/loai-diem-thi-dua/tao`, emulationCriteriaModel)
  }
  deleteListEmu(ids: string[]){
    return this.http.post<EmulationCriteriaModel>(`${this.API}danh-muc-truong/loai-diem-thi-dua/xoa-danh-sach`, ids)
  }
  putEmu(id: string, emulationCriteriaModel: EmulationCriteriaModel){
    return this.http.put<EmulationCriteriaModel>(`${this.API}danh-muc-truong/loai-diem-thi-dua/sua/${id}`,emulationCriteriaModel)
  }
  deleteEmu(id: string){
    return this.http.delete<EmulationCriteriaModel>(`${this.API}danh-muc-truong/loai-diem-thi-dua/xoa/${id}`)
  }
  getPaginationEmu(keyword: string, pageSize: number, skip: number){
    if (keyword === undefined) {
      keyword = '';
    }
    this.inforFind = new GridParam();
    this.inforFind.sort = 'creationTime';
    this.inforFind.sortDirection = SortDirection.DESC;
    this.inforFind.filterItems = [];
    // this.inforFind.filterItems.push({
    //   value: keyword,
    //   propertyName: 'tenLoaiDiemThiDua',
    //   comparison: ComparisonOperator.Contains
    // } as FilterItems);
    if(keyword){
      const params = {
        value: keyword,
      propertyName: 'competitionMarkType',
      comparison: ComparisonOperator.Contains
      } as FilterItems;
      this.inforFind.filterItems.push(params)
    }
    this.inforFind.skipCount = skip;
    this.inforFind.maxResultCount = pageSize;
    return this.http.post<ItemConcurrentWorkTypeModel>(`${this.API}danh-muc-truong/loai-diem-thi-dua/phan-trang`,this.inforFind)
  }

}
