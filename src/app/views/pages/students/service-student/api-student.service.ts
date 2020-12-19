import { Injectable } from '@angular/core';
import { environment as env } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiStudentService {

  private resourceUrl = env.API_GATEWAY_ENDPOINT;
  constructor(private http: HttpClient) { }

  //lấy tất cả học sinh có phân trang
  getAllStudent(input: any): Observable<any> {
    return this.http.post<any>(this.resourceUrl + 'hoc-sinh/phan-trang', input)
  }

  CreateStudent(input: any): Observable<any> {
    return this.http.post<any>(this.resourceUrl + 'hoc-sinh/tao', input)
  }

  EditStudent(id: string, input: any): Observable<any> {
    return this.http.put<any>(this.resourceUrl + `hoc-sinh/sua/${id}`, input)
  }

  detailStudent(id: string): Observable<any>  {
    return this.http.get<any>(this.resourceUrl + `hoc-sinh/${id}`)
  }

  deleteStudentS(input): Observable<any> {
    return this.http.post<any>(this.resourceUrl + 'hoc-sinh/xoa-danh-sach', input)
  }

  getClaasByGradeLevel(gradeLevel: string, schoolYear: string): Observable<any>{
    return this.http.get<any>(this.resourceUrl + `lop-hoc/tim-kiem/${gradeLevel}/${schoolYear}`)
  }

}
