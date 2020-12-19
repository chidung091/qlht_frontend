import { Injectable } from '@angular/core';
import { environment as env } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HonourAchivementService {

  private resourceUrl = env.API_GATEWAY_ENDPOINT;
  constructor(private http: HttpClient) { }

  //Tập thể
  getAll(input: any): Observable<any> {
    return this.http.post<any>(this.resourceUrl + 'danh-hieu-thi-dua-tap-the/phan-trang', input)
  }

  Create(input: any): Observable<any> {
    return this.http.post<any>(this.resourceUrl + 'danh-hieu-thi-dua-tap-the/tao', input)
  }

  Edit(id: string, input: any): Observable<any> {
    return this.http.put<any>(this.resourceUrl + `danh-hieu-thi-dua-tap-the/sua/${id}`, input)
  }

  deleteS(input): Observable<any> {
    return this.http.post<any>(this.resourceUrl + 'danh-hieu-thi-dua-tap-the/xoa-danh-sach', input)
  }

  detailTT(id: string) {
    return this.http.get<any>(this.resourceUrl + `danh-hieu-thi-dua-tap-the/${id}`)
  }

  //Cán bộ
  GetAllCb(input: any): Observable<any> {
    return this.http.post<any>(this.resourceUrl + 'danh-hieu-thi-dua/phan-trang', input)
  }

  CreateCb(input: any): Observable<any> {
    return this.http.post<any>(this.resourceUrl + 'danh-hieu-thi-dua/tao', input)
  }

  EditCb(id: string, input: any): Observable<any> {
    return this.http.put<any>(this.resourceUrl + `danh-hieu-thi-dua/sua/${id}`, input)
  }

  deleteCb(employeeId: any, achivementTeacherId: any): Observable<any> {
    return this.http.delete<any>(this.resourceUrl + `danh-hieu-thi-dua/xoa/${employeeId}/${achivementTeacherId}`)
  }
  
  deleteSCB(input: any): Observable<any> {
    return this.http.post<any>(this.resourceUrl + 'danh-hieu-thi-dua/xoa-danh-sach', input)
  }

  detailDHTD(id: string) {
    return this.http.get<any>(this.resourceUrl + `danh-hieu-thi-dua/${id}`)
  }

  //get cán bộ theo tổ bộ môn
  getOfficerByFacultyId (facultyId: any): Observable<any> {
    return this.http.get<any>(this.resourceUrl + `can-bo/lay-can-bo-to-bo-mon/${facultyId}`)
  }
}