import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {ComparisonOperator, FilterItems, GridParam, SortDirection} from '../model/grid-param';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ItemEmployeePraiseDisciplineModel} from "../model/ItemEmployeePraiseDiscipline.model";
import {EmployeePraiseDiscipline} from "../model/employee-praise-discipline.model";

@Injectable({
  providedIn: 'root'
})
export class EmployeePraiseDisciplineService {
  private API = `${environment.API_GATEWAY_ENDPOINT}`
  private inforFind: GridParam;
  constructor(private http: HttpClient) { }

  getPraise(pageSize: number,skip: number) : Observable<ItemEmployeePraiseDisciplineModel> {
    this.inforFind = new GridParam();
      this.inforFind.filterItems = [];
      this.inforFind.filterItems.push({
          value: true,
          propertyName: 'isKhenThuong',
          comparison: ComparisonOperator.Equal
        } as FilterItems);
      this.inforFind.skipCount = skip;
      this.inforFind.maxResultCount = pageSize;
    return this.http.post<ItemEmployeePraiseDisciplineModel>(`${this.API}khen-thuong-ky-luat/phan-trang`, this.inforFind);
  }

  getDiscipline(pageSize: number,skip: number) : Observable<ItemEmployeePraiseDisciplineModel> {
    this.inforFind = new GridParam();
    this.inforFind.filterItems = [];
    this.inforFind.filterItems.push({
      value: false,
      propertyName: 'isKhenThuong',
      comparison: ComparisonOperator.Equal
    } as FilterItems);
    this.inforFind.skipCount = skip;
    this.inforFind.maxResultCount = pageSize;
    return this.http.post<ItemEmployeePraiseDisciplineModel>(`${this.API}khen-thuong-ky-luat/phan-trang`, this.inforFind);
  }

  searchPraise(toBoMonId: string, canBoId: string,pageSize: number,skip: number):Observable<ItemEmployeePraiseDisciplineModel>{
    this.inforFind = new GridParam();
    this.inforFind.filterItems = [];
    this.inforFind.filterItems.push({
      value: true,
      propertyName: 'isKhenThuong',
      comparison: ComparisonOperator.Equal
    } as FilterItems)
    if (toBoMonId) {
      this.inforFind.filterItems.push({
        value: toBoMonId,
        propertyName: 'toBoMonId',
        comparison: ComparisonOperator.Equal
      } as FilterItems);
    }

    if (canBoId) {
      this.inforFind.filterItems.push({
        value: canBoId,
        propertyName: 'canBoId',
        comparison: ComparisonOperator.Equal
      } as FilterItems);
    }
    this.inforFind.skipCount = skip;
    this.inforFind.maxResultCount = pageSize;
    return this.http.post<ItemEmployeePraiseDisciplineModel>(`${this.API}khen-thuong-ky-luat/phan-trang`, this.inforFind);
  }

  searchDiscipline(toBoMonId: string, canBoId: string,pageSize: number,skip: number):Observable<ItemEmployeePraiseDisciplineModel>{
    this.inforFind = new GridParam();
    this.inforFind.filterItems = [];
    this.inforFind.filterItems.push({
      value: false,
      propertyName: 'isKhenThuong',
      comparison: ComparisonOperator.Equal
    } as FilterItems)
    if (toBoMonId) {
      this.inforFind.filterItems.push({
        value: toBoMonId,
        propertyName: 'toBoMonId',
        comparison: ComparisonOperator.Equal
      } as FilterItems);
    }
    if (canBoId) {
      this.inforFind.filterItems.push({
        value: canBoId,
        propertyName: 'canBoId',
        comparison: ComparisonOperator.Equal
      } as FilterItems);
    }
    this.inforFind.skipCount = skip;
    this.inforFind.maxResultCount = pageSize;
    return this.http.post<ItemEmployeePraiseDisciplineModel>(`${this.API}khen-thuong-ky-luat/phan-trang`, this.inforFind);
  }

  add(employeePraiseDiscipline: EmployeePraiseDiscipline): Observable<EmployeePraiseDiscipline> {
    return this.http.post<EmployeePraiseDiscipline>(`${this.API}khen-thuong-ky-luat/tao`, employeePraiseDiscipline);
  }

  update(employeePraiseDiscipline: EmployeePraiseDiscipline, id: string): Observable<EmployeePraiseDiscipline> {
    return this.http.put<EmployeePraiseDiscipline>(`${this.API}khen-thuong-ky-luat/sua/${id}`, employeePraiseDiscipline);
  }

  delete(id: string) {
    return this.http.delete(`${this.API}khen-thuong-ky-luat/xoa/${id}`);
  }

  SearchPraise(infor: any): Observable<ItemEmployeePraiseDisciplineModel>{
    return this.http.post<ItemEmployeePraiseDisciplineModel>(`${this.API}khen-thuong-ky-luat/phan-trang`, infor);
  }
  DeleteMultiple(input): Observable<any> {
    return this.http.post<void>(`${this.API}khen-thuong-ky-luat/xoa-danh-sach`, input);
  }
}
