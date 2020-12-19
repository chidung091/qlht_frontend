import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EmployeeTraining, ItemEmployeeTraining} from '../model/employee-training';

@Injectable({
  providedIn: 'root',
})
export class EmployeeTrainingService{
  private API = `${environment.API_GATEWAY_ENDPOINT}`
  constructor(private http: HttpClient) { }

  GetEmployeeTraining(EmployeeId : string,
                      Filter : string,
                      Sorting : string,
                      SkipCount : number,
                      MaxResultCount: number): Observable<ItemEmployeeTraining> {
    const id = 'EmployeeId=' + EmployeeId;
    const filter = '&Filter=' + Filter;
    const sorting = '&Sorting=' + Sorting;
    const skipcount = '&SkipCount=' + SkipCount;
    const maxresult = '&MaxResultCount=' + MaxResultCount;
    return this.http.get<ItemEmployeeTraining>(
      `${this.API}can-bo/dao-tao?${id + filter + sorting + skipcount + maxresult}`
    );
  }

  CreateEmployeeTraining(empId: string, emp: EmployeeTraining) : Observable<EmployeeTraining>{
    return this.http.post<EmployeeTraining>(`${this.API}can-bo/dao-tao/${empId}`, emp);
  }

  UpdateEmployeeTraining(empId: string, emp: EmployeeTraining) : Observable<EmployeeTraining>{
    return this.http.put<EmployeeTraining>(`${this.API}can-bo/dao-tao/${empId}`, emp);
  }
  DeleteEmployeeTraining(empId: string, idList: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: idList
    };
    return this.http.delete(`${this.API}can-bo/dao-tao/${empId}`,httpOptions);
  }
}
