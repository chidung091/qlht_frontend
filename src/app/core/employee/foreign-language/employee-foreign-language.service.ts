import {Injectable} from '@angular/core';
import {environment as env, environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EmployeeForeignLanguageModel, ListEmployeeForeignLanguageModel} from './employee-foreign-language.model';
import {GridParam, SortDirection} from '../../service/model/grid-param';

@Injectable({
  providedIn: 'root'
})

export class EmployeeForeignLanguageService {
  private resourceUrl = env.API_GATEWAY_ENDPOINT + 'can-bo/ngoai-ngu';
  constructor(private http: HttpClient) { }

  getAllEmployeeForeignLangague(EmId: string, skipCount: number, maxResultCount: number): Observable<ListEmployeeForeignLanguageModel> {
    return this.http.get<ListEmployeeForeignLanguageModel>(this.resourceUrl+`?EmployeeId=${EmId}`+`&SkipCount=${skipCount}`+`&MaxResultCount=${maxResultCount}`);
  }

  addEmployeeForeignLanguage(emID: string, param: EmployeeForeignLanguageModel): Observable<EmployeeForeignLanguageModel> {
    return this.http.post<EmployeeForeignLanguageModel>(this.resourceUrl+ `/employeeId?employeeId=${emID}`, param);
  }

  editEmployeeForeignLanguage(emID: string, param: EmployeeForeignLanguageModel): Observable<EmployeeForeignLanguageModel> {
    return this.http.put<EmployeeForeignLanguageModel>(this.resourceUrl+ `/${emID}`, param);
  }

  deleteEmployeeForeignLanguage(emID: string, idParent): Observable<any> {
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: idParent};
    return this.http.delete<EmployeeForeignLanguageModel>(this.resourceUrl+ `/${emID}`, httpOptions);
  }
}
