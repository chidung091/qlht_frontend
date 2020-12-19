import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EmployeePraiseModel} from '../model/employee-praise.model';
import {Observable} from 'rxjs';
import {ItemEmployeePraiseModel} from '../model/item-employee-praise.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeePraiseService {
  private API = `${environment.API_GATEWAY_ENDPOINT}`
  constructor(private http: HttpClient) { }

  addEmployeePraise(employeePraise: any, id: string): Observable<EmployeePraiseModel>{
    return this.http.post<EmployeePraiseModel>(`${this.API}can-bo/khen-thuong/${id}`, employeePraise);
  }
  updateEmployeePraise(employeePraise: any, EmployeeId: any): Observable<EmployeePraiseModel> {
    return this.http.put<EmployeePraiseModel>(`${this.API}can-bo/khen-thuong/${EmployeeId}`, employeePraise);
  }
  getAllEmployeePraise(FacultyId: any, EmployeeId: any,SchoolYearId: any,Filter:any,Sorting:any, SkipCount: number, MaxResultCount: number):
    Observable<ItemEmployeePraiseModel> {
    return this.http.get<ItemEmployeePraiseModel>(this.API + 'can-bo/khen-thuong?FacultyId=' + FacultyId + '&EmployeeId=' + EmployeeId +
      '&SchoolYearId=' + SchoolYearId + '&Filter=' + Filter + '&Sorting=' + Sorting +
      '&SkipCount=' + SkipCount + '&MaxResultCount=' + MaxResultCount)
  }
  deleteEmployeePraise(idList): Observable<any> {
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: idList};
    return this.http.delete(`${this.API}can-bo/khen-thuong`,httpOptions);
  }
}
