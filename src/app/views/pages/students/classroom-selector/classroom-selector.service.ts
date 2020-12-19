import {Injectable} from '@angular/core';
import {environment as env} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ClassroomModel} from '../../../../core/service/model/classroom.model';

@Injectable({
  providedIn: 'root'
})
export class ClassroomSelectorService {
  private resourceUrl = env.API_GATEWAY_ENDPOINT;
  constructor(private http: HttpClient) { }

  getClassByGradeAndYear(gradeLv: string, schoolYear: string){
    return this.http.get<ClassroomModel[]>(`${this.resourceUrl}lop-hoc/tim-kiem/${gradeLv}/${schoolYear}`);
  }
}
