import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EmployeeDisciplineModel} from '../model/employee-discipline.model';
import {ItemEmployeeDisciplineModel} from '../model/item-employee-discipline.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDisciplineService {
  private API = `${environment.API_GATEWAY_ENDPOINT}`
  constructor(private http: HttpClient) { }

  addEmployeeDiscipline(employeeDiscipline: any, id: string): Observable<EmployeeDisciplineModel>{
    return this.http.post<EmployeeDisciplineModel>(`${this.API}can-bo/ky-luat/${id}`, employeeDiscipline);
  }
  updateEmployeeDiscipline(employeeDiscipline: any, EmployeeId: any): Observable<EmployeeDisciplineModel> {
    return this.http.put<EmployeeDisciplineModel>(`${this.API}can-bo/ky-luat/${EmployeeId}`, employeeDiscipline);
  }
  getAllEmployeeDiscipline(FacultyId: any, EmployeeId: any,SchoolYearId: any,
                           Filter:any,Sorting:any, SkipCount: number, MaxResultCount: number):
    Observable<ItemEmployeeDisciplineModel> {
    return this.http.get<ItemEmployeeDisciplineModel>(this.API + 'can-bo/ky-luat?FacultyId=' + FacultyId + '&EmployeeId=' + EmployeeId +
      '&SchoolYearId=' + SchoolYearId + '&Filter=' + Filter + '&Sorting=' + Sorting +
      '&SkipCount=' + SkipCount + '&MaxResultCount=' + MaxResultCount)
  }
  deleteEmployeeDiscipline(idList): Observable<any> {
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: idList};
    return this.http.delete(`${this.API}can-bo/ky-luat`,httpOptions);
  }
}
