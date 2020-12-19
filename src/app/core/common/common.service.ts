import {Injectable} from '@angular/core';
import {environment as env} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListSchoolFacultyModel} from './model/school-faculty.model';
import {PublicServantModel} from './model/public-servant.model';

@Injectable({providedIn: 'root'})
export class CommonService {
  private resourceUrl = env.API_GATEWAY_ENDPOINT;

  constructor(
    private http: HttpClient
  ) {
  }

  getAllSchoolFaculty(): Observable<ListSchoolFacultyModel> {
    return this.http.get<ListSchoolFacultyModel>(this.resourceUrl + `bo-mon/tat-ca`);
  }

  getAllPublicServant(): Observable<PublicServantModel[]> {
    return this.http.get<PublicServantModel[]>(this.resourceUrl + 'danh-muc-ngach-cong-chuc/tat-ca')
  }

}
