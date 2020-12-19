import {Injectable} from '@angular/core';
import {environment as env} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EmployeeModel, ListEmployeeModel} from './employee.model';

@Injectable({providedIn: 'root'})
export class EmployeeService{
  private resourceUrl = env.API_GATEWAY_ENDPOINT + 'can-bo';
  constructor(
    private http: HttpClient
  ){}

  getAllEmployee(): Observable<ListEmployeeModel> {
    return this.http.get<ListEmployeeModel>(this.resourceUrl+`tat-ca`)
  }

  getEmployee(id: string): Observable<EmployeeModel> {
    return this.http.get<EmployeeModel>(this.resourceUrl+ `${id}`);
  }

  deleteEmployee(id: string){
    return this.http.delete(this.resourceUrl+ `${id}`);
  }

  updateEmployee(id: string, employee: EmployeeModel): Observable<EmployeeModel>{
    return this.http.put<EmployeeModel>(this.resourceUrl+ `sua/${id}`, employee)
  }
}
