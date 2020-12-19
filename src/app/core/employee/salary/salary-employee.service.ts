import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EmployeeSalary, ItemEmployeeSalary} from './salary-employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeSalaryService {
  private API = `${environment.API_GATEWAY_ENDPOINT}`
  constructor(private http: HttpClient) { }

  listEmployeeSalary(employeeSalaryId: string): Observable<EmployeeSalary>{
    return this.http.get<EmployeeSalary>(`${this.API}luong-can-bo/${employeeSalaryId}`);
  }

  createEmployeeSalary(employeeSalary: EmployeeSalary): Observable<EmployeeSalary>{
    return this.http.post<EmployeeSalary>(`${this.API}luong-can-bo/tao`, employeeSalary);
  }

  GetEmployeeSalary(infor: any): Observable<ItemEmployeeSalary>{
    return this.http.post<ItemEmployeeSalary>(`${this.API}luong-can-bo/phan-trang`,infor);
  }

  DeleteMultiple(input): Observable<any> {
    return this.http.post<void>(`${this.API}luong-can-bo/xoa-danh-sach`, input);
  }
  EditMultiple(empID,AllwanceId,input): Observable<any> {
    return this.http.put<void>(`${this.API}luong-can-bo/sua/${empID}/${AllwanceId}`, input);
  }
}
