import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {GetSubjectModel, GradeModel, ItemSubjectModel, SaveSubjectModel, SubjectModel} from '../model/subject.model';

const SERVER_API_URL = environment.API_GATEWAY_ENDPOINT;

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) {
  }

  getAllSubject():Observable<SubjectModel[]>{
    return this.http.get<SubjectModel[]>(`${SERVER_API_URL}danh-muc-mon-hoc/tat-ca`);
  }

  getSubjectByClass(data: GetSubjectModel):Observable<ItemSubjectModel>{
    return this.http.post<ItemSubjectModel>(`${SERVER_API_URL}lop-mon-hoc/phan-trang`, data);
  }

  getSubjectByLevel(data: any):Observable<ItemSubjectModel>{
    return this.http.post<ItemSubjectModel>(`${SERVER_API_URL}lop-mon-hoc/phan-trang`, data);
  }

  saveSubject(data: SaveSubjectModel):Observable<ItemSubjectModel>{
    return this.http.post<ItemSubjectModel>(`${SERVER_API_URL}lop-mon-hoc/tao`, data);
  }

  getAllGrade():Observable<GradeModel[]>{
    return this.http.get<GradeModel[]>(`${SERVER_API_URL}danh-muc/loai-danh-muc/DM_KHOI`);
  }
}
