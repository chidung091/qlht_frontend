import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {ComparisonOperator, FilterItems, GridParam, SortDirection} from "../model/grid-param";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NotiService} from "./notification.service";
import {Observable} from "rxjs";
import {
  AddingConcurrentWorkAssignmentModel,
  ConcurrentWorkAssignmentModel,
  ItemConcurrentWorkAssignmentModel
} from "../model/concurrent-work-assignment.model";
import {Employee} from "../model/Employee";
import {EmployeeProfileModel} from "../model/Employee-profile";

@Injectable({
  providedIn: 'root'
})
export class ConcurrentWorkAssigmentService {
  private API = `${environment.API_GATEWAY_ENDPOINT}`;
  private inforFind: GridParam;

  constructor(private http: HttpClient, private notiService: NotiService) {
  }

  getConcurrentPage(schoolYear: string,facultyId:string,employeeId: string,concurrentworkTypeId: string, pageSize: number, skip: number):
    Observable<ItemConcurrentWorkAssignmentModel> {
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
    }else {
      return new Observable<ItemConcurrentWorkAssignmentModel>();
    }
    if(employeeId){
      this.inforFind.filterItems.push({
        propertyName: 'employeeId',
        value: employeeId,
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
    if(concurrentworkTypeId){
      this.inforFind.filterItems.push({
        propertyName: 'concurrentworkTypeId',
        value: concurrentworkTypeId,
        comparison: ComparisonOperator.Equal
      })
    }
    this.inforFind.maxResultCount = pageSize;
    this.inforFind.skipCount = skip;
    return this.http.post<ItemConcurrentWorkAssignmentModel>(`${this.API}phan-cong-kiem-nhiem/phan-trang`, this.inforFind);
  }

  addConcurrentWorkAssi(concurrent: AddingConcurrentWorkAssignmentModel) {
    return this.http.post(`${this.API}phan-cong-kiem-nhiem/tao`, concurrent);
  }

  editConcurrentWorkAssi(concurrent: ConcurrentWorkAssignmentModel) {
    return this.http.put(`${this.API}phan-cong-kiem-nhiem/sua/${concurrent.id}`, concurrent);
  }

  deleteConcurrentWorkAss(idconcurrent: string[]) {
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: idconcurrent};
    return this.http.delete(`${this.API}phan-cong-kiem-nhiem/xoa-nhieu`,httpOptions);
    // return this.http.post(`${this.API}phan-cong-kiem-nhiem/xoa-nhieu`,idconcurrent);
  }

  getOfficesFolowInfor(namHoc: string, idFauclity: string, maCv: string, pageSize: number, skip: number): Observable<ItemEmployee> {
    const employee = new FindEmoloyee();
    employee.concurrentWorkId = maCv;
    employee.shcoolYear = namHoc;
    employee.maxResultCount = pageSize;
    employee.facultyId = idFauclity;
    employee.skipCount = skip;
    return this.http.post<ItemEmployee>(`${this.API}can-bo/lay-can-bo-cho-cong-viec-kiem-nhiem`, employee);
  }

  getConcurrent(){

  }
}

export class FindEmoloyee {
  facultyId: string;
  concurrentWorkId: string;
  shcoolYear: string;
  sorting: string;
  skipCount: number;
  maxResultCount: number;
}

export class ItemEmployee {
  totalCount: number;
  items: EmployeeProfileModel[];
}
