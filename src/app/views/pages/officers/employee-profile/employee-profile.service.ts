import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EmployeeProfileModel} from '../../../../core/service/model/Employee-profile';
import {environment as env} from '../../../../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Category} from '../../../../core/category';

@Injectable({
  providedIn: 'root'
})
export class EmployeeProfileService {
  private resourceUrl = env.API_GATEWAY_ENDPOINT;

  constructor(
    private http: HttpClient
  ) {
  }

  public getEditData(id): Observable<any> {
    return this.http.get<any>(this.resourceUrl + `can-bo/${id}`).pipe(
      res => {
        return res
      }
    )
  }

  public createEmployeeProfile(data) {
    console.log(data)
    return this.http.post<any>(this.resourceUrl + 'can-bo/tao', data)
  }

  public updateEmployeeProfile(data, id): Observable<any> {
    return this.http.put<any>(this.resourceUrl + `can-bo/sua/${id}`, data)
  }
  public getEducateEmployee(id): Observable<any>{
    return this.http.get<any>(this.resourceUrl+`dao-tao-boi-duong/${id}`)
  }
  public getJobTitle(): Observable<any>{
    return this.http.get(this.resourceUrl+'danh-muc/loai-danh-muc/DM_LOAI_CAN_BO')
  }
  public getEmployeeSalaryInfo(id): Observable<any>{
    return this.http.get<any>(this.resourceUrl+`luong-can-bo/${id}`)
  }
  public createEmployeeSalaryInfo(data): Observable<any>{
    return this.http.post<any>(this.resourceUrl+'luong-can-bo/tao',data)
  }
  public updatetEmployeeSalaryInfo(id,employeeSalaryAllwanceId,data): Observable<any>{
    return this.http.put<any>(this.resourceUrl+`luong-can-bo/sua/${id}/${employeeSalaryAllwanceId}`,data)
  }
}
