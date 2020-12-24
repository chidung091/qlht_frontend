import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee} from '../_models/employee';
import {Observable} from 'rxjs';
import {ItemEmployee} from '../_models/ItemEmployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private API = `http://localhost:5035`;

  constructor(private http: HttpClient) { }

  getEmployee(body: any):Observable<ItemEmployee>{
    return this.http.post<ItemEmployee>(`${this.API}/api/user/all`,body);
  }

  createEmployee(employee: Employee) {
    return this.http.post<Employee>(`${this.API}/api/user/register`, employee);
  }

  updateEmployee(employee: any, id: string) {
    return this.http.put<Employee>(`${this.API}/api/user/update/${id}`, employee);
  }

  deleteEmployeeById(id: string) {
    return this.http.delete<Employee>(`${this.API}/api/user/delete/${id}`);
  }
  searchByName(body: any){
    return this.http.post<any>(`${this.API}/api/user/search/name`, body);
  }
}
