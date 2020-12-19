import { Injectable } from '@angular/core';
import { environment as env } from '../../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherSubstituonsService {

  private resourceUrl = env.API_GATEWAY_ENDPOINT;
  constructor(private http: HttpClient) { }

  getAllByBlock(schoolYearId: string, gradeLevelCode: string ): Observable<any>{
    return this.http.get<any>(this.resourceUrl + "giao-vu/phan-cong-chu-nhiem/lam-thay?schoolYearId=" + schoolYearId + '&gradeLevelCode' + gradeLevelCode)
  }
  
  search(schoolYearId: string, facultyId: string, employeeId: string): Observable<any>{
    return this.http.get<any>(this.resourceUrl + `giao-vu/phan-cong-chu-nhiem/lam-thay/${schoolYearId}/${facultyId}/${employeeId}`)
  }

  save(input): Observable<any> {
    return this.http.post<any>(this.resourceUrl + 'giao-vu/phan-cong-chu-nhiem/lam-thay', input)
  }

}
