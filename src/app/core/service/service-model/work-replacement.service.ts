import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {ItemWorkReplacementMode, WorkReplacementModel} from "../model/work-replacement.model";
import {ComparisonOperator, GridParam, SortDirection} from "../model/grid-param";
import {Employee} from "../model/Employee";
import {EmployeeProfileModel} from "../model/Employee-profile";

@Injectable({
  providedIn: 'root'
})
export class WorkReplacementService {
  private API = `${environment.API_GATEWAY_ENDPOINT}`;
  private inforFind: GridParam;
  constructor(private http: HttpClient) { }

  getWorkRelacementByPage(schoolYear: string,facultyId:string,employeeConcurrentId: string,workCode: string,pageSize: number, skip: number): Observable<ItemWorkReplacementMode>{
    this.inforFind = new GridParam();
    this.inforFind.sort = 'creationtime';
    this.inforFind.sortDirection = SortDirection.DESC;
    this.inforFind.filterItems = [];
    if (schoolYear) {
      this.inforFind.filterItems.push({
        propertyName: 'schoolYear',
        value: schoolYear,
        comparison: ComparisonOperator.Equal
      })
    }
    if(employeeConcurrentId){
      this.inforFind.filterItems.push({
        propertyName: 'employeeConcurrentId',
        value: employeeConcurrentId,
        comparison: ComparisonOperator.Equal
      })
    }
    if(facultyId){
      this.inforFind.filterItems.push({
        propertyName: 'facultyId',
        value: facultyId,
        comparison: ComparisonOperator.Equal
      })
    }
    if(workCode){
      this.inforFind.filterItems.push({
        propertyName: 'workCode',
        value: workCode,
        comparison: ComparisonOperator.Equal
      })
    }
    this.inforFind.maxResultCount = pageSize;
    this.inforFind.skipCount = skip;
    return this.http.post<ItemWorkReplacementMode>(`${this.API}lam-thay-kiem-nhiem/phan-trang`,this.inforFind);
  }

  getEmployeeByConcurrent(namHoc: string, maMon: string): Observable<EmployeeProfileModel[]>{
    const find = {
      congviecId: maMon,
      namhoc: namHoc
    }
   return this.http.post<EmployeeProfileModel[]>(`${this.API}phan-cong-kiem-nhiem/lay-can-bo-theo-cong-viec?congviecId=${maMon}&namhoc=${namHoc}`,find);
  }

  addWorkRelacementByPage(workReplacement: WorkReplacementModel){
   return  this.http.post(`${this.API}lam-thay-kiem-nhiem/tao`,workReplacement);
  }

  editWorkRelacementByPage(workReplay: WorkReplacementModel){
   return this.http.put(`${this.API}lam-thay-kiem-nhiem/sua/${workReplay.id}`,workReplay);
  }

  getAllEmployee(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.API}can-bo/tat-ca`);
  }

  deleteWorkReplace(idList: string[]): Observable<any> {
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: idList};
    return this.http.delete<void>(`${this.API}lam-thay-kiem-nhiem/xoa-nhieu`, httpOptions);
  }
}
