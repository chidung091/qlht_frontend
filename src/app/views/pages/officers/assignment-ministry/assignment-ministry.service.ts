import {Injectable} from '@angular/core';
import {environment as env} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SupervisorRoleModel} from './model/supervisor-role.model';
import {AssignmentMinistryModel} from './model/assignment-ministry.model';
import {ManagementModel} from '../../../../core/service/model/management.model';
import {ClassroomModel} from '../../../../core/service/model/classroom.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentMinistryService {
  private resourceUrl = env.API_GATEWAY_ENDPOINT;
  constructor(private http: HttpClient) { }

  getSupervisorRole(): Observable<SupervisorRoleModel[]> {
    return this.http.get<SupervisorRoleModel[]>(`${this.resourceUrl}identity/roles/supervisor-role`)
  }

  getAssignmentMinistryByGrade(employeeId: string, schoolYearId: string, gradeLevelCode: string): Observable<AssignmentMinistryModel[]> {
    return this.http.get<AssignmentMinistryModel[]>(`${this.resourceUrl}giao-vu/phan-cong-giao-vu/theo-khoi?employeeId=${employeeId}&schoolYearId=${schoolYearId}&gradeLevelCode=${gradeLevelCode}`)
  }

  updateAssignmentMinistry(request: AssignmentMinistryModel[]) {
    return this.http.put(`${this.resourceUrl}giao-vu/phan-cong-giao-vu`, request);
  }

  getManagementBySchoolFaculty(id: string): Observable<ManagementModel[]>{
    return this.http.get<ManagementModel[]>(`${this.resourceUrl}can-bo/lay-can-bo-to-bo-mon/${id}`);
  }

  getClassByGradeAndYear(gradeLv: string, schoolYear: string){
    return this.http.get<ClassroomModel[]>(`${this.resourceUrl}lop-hoc/tim-kiem/${gradeLv}/${schoolYear}`);
  }
}
