import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ComparisonOperator,
  FilterItems,
  GridParam,
  SortDirection,
} from '../model/grid-param';
import { ItemSchoolYearModel } from '../model/item-school-year.model';
import { SchoolYear } from '../model/school-year.model';
import { NotiService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class SchoolYearService {
  private API = `${environment.API_GATEWAY_ENDPOINT}`;
  private inforFind: GridParam;
  public showSpinner: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient, private notiService: NotiService) {}

  getAllSchoolYear(): Observable<ItemSchoolYearModel> {
    return this.http.get<ItemSchoolYearModel>(`${this.API}nam-hoc/tat-ca`);
  }

  addSchoolYear(schoolYear: SchoolYear): Observable<SchoolYear> {
    return this.http.post<SchoolYear>(`${this.API}nam-hoc/tao`, schoolYear);
  }

  updateSchoolYear(id: string, schoolYear: SchoolYear): Observable<SchoolYear> {
    return this.http.put<SchoolYear>(
      `${this.API}nam-hoc/sua/${id}`,
      schoolYear
    );
  }

  deleteSchoolYear(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API}nam-hoc/xoa/${id}`);
  }
}
