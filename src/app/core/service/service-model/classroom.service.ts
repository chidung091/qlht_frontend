import {HttpClient} from '@angular/common/http';
import {NotiService} from './notification.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {ClassroomModel, ItemClassroomModel} from '../model/classroom.model';
import { GridParam} from '../model/grid-param';
import {SchoolYear} from '../model/school-year.model';

@Injectable({
  providedIn: 'root'
})

export class ClassroomService {
  private API = `${environment.API_GATEWAY_ENDPOINT}`;
  private inforFind: GridParam;
  constructor(private http: HttpClient, private notiService: NotiService) {
  }
  fetchclassroom() {
    return this.http.get<any>(`${this.API}roles/all`);
  }
  getAllClassroom():Observable<ClassroomModel[]>{
    return this.http.get<ClassroomModel[]>(`${this.API}lop-hoc/tat-ca`);
  }
  getNamHoc(): Observable<SchoolYear[]> {
    return this.http.get<SchoolYear[]>(`${this.API}nam-hoc/tat-ca`);
  }
  addClassroom(payload: ClassroomModel){
    return this.http.post<ClassroomModel>(`${this.API}lop-hoc/tao`, payload);
  }

  updateClassroom(id: string, payload: ClassroomModel) {
    return this.http.put<ClassroomModel>(`${this.API}lop-hoc/sua/${id}`, payload);
  }
  DeleteClassroom(id: string) {
    return this.http.delete(`${this.API}lop-hoc/xoa/${id}`);
  }
  DeleteClassroomList(ids: string[]){
    return this.http.post(`${this.API}lop-hoc/xoa-danh-sach`,ids);
  }
  getLopbyKhoi(Keyword: string): Observable<ClassroomModel[]> {
    return this.http.get<ClassroomModel[]>(`${this.API}lop-hoc/tim-kiem/${Keyword}`);
  }

  getClassByGrade(Keyword: string) {
    return this.http.get<ClassroomModel[]>(`${this.API}lop-hoc/tim-kiem/${Keyword}`);
  }
  GetClassByGradeAndYear(Keyword: any,namHoc: any) {
    return this.http.get<ClassroomModel[]>(`${this.API}lop-hoc/tim-kiem/${Keyword}/${namHoc}`);
  }
  GetClassByYear(namHoc: any){
    return this.http.get<ClassroomModel[]>(`${this.API}lop-hoc/nam-hoc/${namHoc}`);
  }

  getClassByPage(infor: any): Observable<ItemClassroomModel>{
    return this.http.post<ItemClassroomModel>(`${this.API}lop-hoc/phan-trang`,infor);
  }

}
