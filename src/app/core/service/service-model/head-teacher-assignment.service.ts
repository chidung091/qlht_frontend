import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HeadTeacherAssignmentModule} from "../../../views/pages/officers/head-teacher-assignment/head-teacher-assignment.module";
import {ClassroomModel} from "../model/classroom.model";
@Injectable({
  providedIn: 'root'
})
export class HeadTeacherAssignmentService{
  private API = `${environment.API_GATEWAY_ENDPOINT}`;
  constructor(private http: HttpClient) {
  }

  getHeadTeacherAssignment(schoolYearId:any,gradeLevelCode:any):Observable<HeadTeacherAssignmentModule[]>{
    return this.http.get<HeadTeacherAssignmentModule[]>
    (this.API+`giao-vu/phan-cong-chu-nhiem/theo-khoi?schoolYearId=${schoolYearId}`+`&gradeLevelCode=${gradeLevelCode}`)
  }

  getHeadTeacherAssignmentSearch(schoolYearId:any,facultyId:any,employeeId:any):Observable<HeadTeacherAssignmentModule>{
    return this.http.get<HeadTeacherAssignmentModule[]>
    (this.API+'giao-vu/phan-cong-chu-nhiem/tim-kiem?schoolYearId'+schoolYearId+'&facultyId'+facultyId+'&employeeId'+employeeId)
  }
  getClassByGradeAndYear(gradeLv: string, schoolYear: string){
    return this.http.get<ClassroomModel[]>(`${this.API}lop-hoc/tim-kiem/${gradeLv}/${schoolYear}`);
  }






}
