import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {ComparisonOperator, FilterItems, GridParam, SortDirection} from '../model/grid-param';
import {ItemConcurrentWorkTypeModel} from '../model/item-concurrentworktype.model';
import {HttpClient} from '@angular/common/http';
import {ItemPraiseDisciplineModel} from '../model/item-praise-discipline.model';
import {PraiseDisciplineTypeModel} from '../model/praise-discipline-type.model';

@Injectable({
  providedIn: 'root'
})
export class PraiseDisciplineTypeService {
  private API = `${environment.API_GATEWAY_ENDPOINT}`;
  private inforFind: GridParam;
  constructor(private http: HttpClient) { }
  getAllPD(){
    return this.http.get<ItemPraiseDisciplineModel>(`${this.API}danh-muc-truong/khen-thuong-ky-luat/tat-ca`)
  }
  postPD(praiseDisciplineTypeModel: PraiseDisciplineTypeModel){
    return this.http.post<PraiseDisciplineTypeModel>(`${this.API}danh-muc-truong/khen-thuong-ky-luat/tao`, praiseDisciplineTypeModel)
  }
  deleteListPD(ids: string[]){
    return this.http.post<PraiseDisciplineTypeModel>(`${this.API}danh-muc-truong/khen-thuong-ky-luat/xoa-danh-sach`, ids)
  }
  putPD(id: string, praiseDisciplineTypeModel: PraiseDisciplineTypeModel){
    return this.http.put<PraiseDisciplineTypeModel>(`${this.API}danh-muc-truong/khen-thuong-ky-luat/sua/${id}`,praiseDisciplineTypeModel)
  }
  deletePD(id: string){
    return this.http.delete<PraiseDisciplineTypeModel>(`${this.API}danh-muc-truong/khen-thuong-ky-luat/xoa/${id}`)
  }
  getPaginationPD(keyword: string, loaiKhenThuongKyLuat: number, pageSize: number, skip: number){
    if(keyword === undefined){
      keyword = '';
    }
    // if(loaiKhenThuongKyLuat === undefined){
    //   loaiKhenThuongKyLuat = 0;
    // }
    this.inforFind = new GridParam();
    this.inforFind.sort = 'creationTime';
    this.inforFind.sortDirection = SortDirection.DESC;
    this.inforFind.filterItems = [];
    // let params = {
    //   value: loaiKhenThuongKyLuat,
    //   propertyName: 'loaiKhenThuongKyLuat',
    //   comparison: ComparisonOperator.Equal
    // } as FilterItems;
    // this.inforFind.filterItems.push(params);

    if (keyword) {
      const params = {
        value: keyword,
        propertyName: 'content',
        comparison: ComparisonOperator.Contains
      } as FilterItems;
      this.inforFind.filterItems.push(params)
    }
    if(loaiKhenThuongKyLuat || loaiKhenThuongKyLuat === 0){
      const params1 = {
        value: loaiKhenThuongKyLuat,
        propertyName: 'type',
        comparison: ComparisonOperator.Equal
      } as FilterItems;
      this.inforFind.filterItems.push(params1)
    }

    this.inforFind.skipCount = skip;
    this.inforFind.maxResultCount = pageSize;
    return this.http.post<ItemConcurrentWorkTypeModel>(`${this.API}danh-muc-truong/khen-thuong-ky-luat/phan-trang`,this.inforFind)
  }
}
