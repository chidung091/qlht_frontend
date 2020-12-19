import {Injectable} from '@angular/core';
import {environment as env} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ComparisonOperator, FilterItems, GridParam} from '../../service/model/grid-param';
import {Observable} from 'rxjs';
import {AssignmentTeachingModel, ListAssignmentTeaching} from './assignment-teaching.module';

@Injectable({
  providedIn: 'root'
})

export class AssignmentTeachingService {
  private resourceUrl = env.API_GATEWAY_ENDPOINT + 'phan-cong-giang-day';

  constructor(private http: HttpClient) { }

  private gridParam: GridParam;

  // Phân trang
  getAllAssignmentTeacher(dataSearchSemester: string, dataSearchClass: string, dataSearchSchoolFaculty: string,
                          dataSearchTeacher: string, dataSearchActive: string, skipCount: number, maxResultCount: number):
    Observable<ListAssignmentTeaching> {

    this.gridParam = new GridParam();
    this.gridParam.filterItems = [];

    if (dataSearchSemester != null && dataSearchSemester !== '') {
      this.gridParam.filterItems.push({
        value: dataSearchSemester,
        propertyName: 'semester',
        comparison: ComparisonOperator.Equal
      } as FilterItems)
    }
    if (dataSearchClass != null && dataSearchClass !== '') {
      this.gridParam.filterItems.push({
        value: dataSearchClass,
        propertyName: 'classId',
        comparison: ComparisonOperator.Equal
      } as FilterItems)
    }
    if (dataSearchSchoolFaculty != null && dataSearchSchoolFaculty !== '') {
      this.gridParam.filterItems.push({
        value: dataSearchSchoolFaculty,
        propertyName: 'facultyId',
        comparison: ComparisonOperator.Equal
      } as FilterItems)
    }
    if (dataSearchTeacher != null && dataSearchTeacher !== '') {
      this.gridParam.filterItems.push({
        value: dataSearchTeacher,
        propertyName: 'employeeId',
        comparison: ComparisonOperator.Equal
      } as FilterItems)
    }
    if (dataSearchActive != null && dataSearchActive !== '') {
      this.gridParam.filterItems.push({
        value: dataSearchActive,
        propertyName: 'isActive',
        comparison: ComparisonOperator.Equal
      } as FilterItems)
    }

    this.gridParam.skipCount = skipCount;
    this.gridParam.maxResultCount = maxResultCount;
    return this.http.post<ListAssignmentTeaching>(`${this.resourceUrl}`+ `/phan-trang`, this.gridParam);
  }

  // Tạo phân công cán bộ
  addAssignmentTeaching(param: AssignmentTeachingModel): Observable<AssignmentTeachingModel> {
    return this.http.post<AssignmentTeachingModel>(`${this.resourceUrl}` + `/tao`, param);
  }

  // Sửa phân công cán bộ
  editAssignmentTeaching(id: string, param: AssignmentTeachingModel): Observable<AssignmentTeachingModel> {
    return this.http.put<AssignmentTeachingModel>(`${this.resourceUrl}` + `/sua/${id}`, param);
  }

  // Xóa phân công
  deleteAssignmentTeaching(id: string): Observable<any> {
    return this.http.delete<void>(`${this.resourceUrl}`+ `/xoa/${id}`);
  }

  // Xóa nhiều
  deleteMultiAssignmentTeaching(listID: string[]): Observable<any> {
    return this.http.post<void>(`${this.resourceUrl}`+ `/xoa-danh-sach`, listID);
  }

}
