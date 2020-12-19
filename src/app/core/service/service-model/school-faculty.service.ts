import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Department} from '../model/department.model';
import {Injectable} from '@angular/core';
import {NotiService} from './notification.service';
import {ItemDepartmentModel} from '../model/item-department.model';
import {environment} from '../../../../environments/environment';
import {ComparisonOperator, FilterItems, GridParam, SortDirection} from '../model/grid-param';


@Injectable({
  providedIn: 'root'
})

export class SchoolFacultyService {
  private API = `${environment.API_GATEWAY_ENDPOINT}`
  private inforFind: GridParam;
  public showSpinner: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient, private notiService: NotiService) {
  }

  getAllDepartMent(): Observable<ItemDepartmentModel> {
    return this.http.get<ItemDepartmentModel>(`${this.API}bo-mon/tat-ca`);
  }


  addDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(`${this.API}bo-mon/tao`, department);
  }

  updateDepartment(department: Department): Observable<Department> {
    return this.http.put<Department>(`${this.API}bo-mon/sua/${department.id}`, department);
  }

  deleteDepartment(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API}bo-mon/xoa/${id}`);
  }

  getDepartment(Keyword: string, nameManagerment: string, pageSize: number, skip: number): Observable<ItemDepartmentModel> {
    if (!Keyword) {
      Keyword = '';
    }
    if (!nameManagerment) {
      nameManagerment = '';
    }
    this.inforFind = new GridParam();
    this.inforFind.sort = 'creationtime';
    this.inforFind.sortDirection = SortDirection.DESC;
    this.inforFind.filterItems = [];
    this.inforFind.filterItems.push({
        value: Keyword,
        propertyName: 'facultyName',
        comparison: ComparisonOperator.Contains
      } as FilterItems,
      {
        value: nameManagerment,
        propertyName: 'employeeManagementName',
        comparison: ComparisonOperator.Contains
      } as FilterItems);
    this.inforFind.skipCount = skip;
    this.inforFind.maxResultCount = pageSize;
    return this.http.post<ItemDepartmentModel>(`${this.API}bo-mon/phan-trang`, this.inforFind);
  }

  deleteListDepartment(listId: string[]): Observable<any> {
    return this.http.post(`${this.API}bo-mon/xoa-danh-sach`, listId);
  }
}
