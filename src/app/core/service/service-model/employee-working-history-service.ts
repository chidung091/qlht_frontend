import { EmployeeWorkingHistory, ItemEmployeeWorkingHistory } from '../model/employee-working-history';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeWorkHistoryService {
  private API = `${environment.API_GATEWAY_ENDPOINT}`;
  constructor(private http: HttpClient) { }

  GetEmployeeWorking(
    EmployeeId: string,
    Filter: string,
    Sorting: string,
    SkipCount: number,
    MaxResultCount: number
  ): Observable<ItemEmployeeWorkingHistory> {
    const id = 'EmployeeId=' + EmployeeId;
    const skipcount = '&SkipCount=' + SkipCount;
    const maxresult = '&MaxResultCount=' + MaxResultCount;
    return this.http.get<ItemEmployeeWorkingHistory>(
      `${this.API}can-bo/qua-trinh-cong-tac?${id + skipcount + maxresult}`
    );
  }

  DeleteEmployeeWorking(empId: string, idList): Observable<any> {
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: idList};
    return this.http.delete<void>(`${this.API}can-bo/qua-trinh-cong-tac/${empId}`, httpOptions);
  }

  CreatEmpWorking(empId: string, work: EmployeeWorkingHistory): Observable<EmployeeWorkingHistory> {
    return this.http.post<EmployeeWorkingHistory>(`${this.API}can-bo/qua-trinh-cong-tac/${empId}`, work);
  }

  UpdateEmpWorking(empId: string, work: EmployeeWorkingHistory): Observable<any> {
    return this.http.put<EmployeeWorkingHistory>(`${this.API}can-bo/qua-trinh-cong-tac/${empId}`, work);
  }
}
