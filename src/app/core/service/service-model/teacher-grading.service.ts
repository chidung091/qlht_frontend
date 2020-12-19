import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {ComparisonOperator, FilterItems, GridParam} from '../model/grid-param';
import {HttpClient} from '@angular/common/http';
import {
  EvaluationHionHistory,
  ItemTeacherGrading,
  TeacherGradingFindModel, TeacherGradingModel
} from '../model/teacher-grading';
import {forkJoin, Observable} from 'rxjs';
import {ItemEmployeeModel} from "../model/item-employee.model";
import {concatMap, concatMapTo, map, mergeMap} from "rxjs/operators";
import {EvaluationCriteriaModel} from "../../evaluation-criteria";
import {TeacherGradingModule} from "../../../views/pages/officers/teacher-grading/teacher-grading.module";
import {EmployeeProfileModel} from "../model/Employee-profile";
import {unwrapLazyLoadHelperCall} from "@angular/localize/src/tools/src/translate/source_files/source_file_utils";

@Injectable({
  providedIn: 'root'
})

export class TeacherGradingService {
  private API = `${environment.API_GATEWAY_ENDPOINT}`;
  private inforFind: GridParam;
  public list: Observable<ItemTeacherGrading>;
  public listTeacherGrading: TeacherGradingModel[] = [];
  listEmployee: EmployeeProfileModel[] = [];
  listEvaluation: EvaluationCriteriaModel [] = [];
  listTeacherGradingId: string[] = [];
  total = 0;
  teacherGrading: TeacherGradingFindModel = new TeacherGradingFindModel();
  gridParam: GridParam;
  listEmployeeID: string[] = [];
  dataGrading = [];

  constructor(private http: HttpClient) {
  }

  getTeacherGradingByInfor(find: TeacherGradingFindModel): Observable<ItemTeacherGrading> {
    return this.http.post<ItemTeacherGrading>(`${this.API}danh-gia-xep-loai/phan-trang`, find);
  }

  editTeacherGradping(data: any): Observable<any> {
    data.employeeEvaluationHistory.forEach(item =>{
      if(item.criteriaValue === 'Lựa chọn'){
        item.criteriaValue = null;
      }
    });
    return this.http.post<TeacherGradingModel[]>(`${this.API}danh-gia-xep-loai/tao`, data);
  }

  deletelistTeacherGrading(listIdTeacherGrading: string[]): Observable<any> {
    return this.http.post(`${this.API}danh-gia-xep-loai/xoa-danh-sach`, listIdTeacherGrading);
  }

  public mergeMapConcat(find: TeacherGradingFindModel) {
    this.dataGrading = []
    this.gridParam = new GridParam();
    this.listTeacherGrading = [];
    this.listEvaluation = []
    this.gridParam.skipCount = find.skipCount;
    this.gridParam.maxResultCount = find.maxResultCount;
    this.gridParam.filterItems = [];
    this.total = 0;
    const listData  = [];
    if (find.facultyId) {
      this.gridParam.filterItems.push({
        value: find.facultyId,
        propertyName: 'schoolFacultyID',
        comparison: ComparisonOperator.Equal
      } as FilterItems)
    }
    if (find.fullName) {
      this.gridParam.filterItems.push({
        value: find.fullName,
        propertyName: 'fullName',
        comparison: ComparisonOperator.Contains
      } as FilterItems)
    }
    const findInfor = {
      trainingLevelCode: null,
      gridParam: this.gridParam
    }

    return this.http.post<ItemEmployeeModel>(`${this.API}can-bo/phan-trang`, findInfor).pipe(
      map(employee => {
        this.total = employee.totalCount;
        this.listEmployee = employee.items;
        employee.items.forEach(item => {
          this.listEmployeeID.push(item.id);
        })
        return employee.items;
      }),
      mergeMap(em => {
        const inforFind = {
          employeeIds: this.listEmployeeID,
          schoolYearId: find.schoolYearID
        }
        const evaluation = this.http.post<TeacherGradingModel[]>(`${this.API}danh-gia-xep-loai/tat-ca`, inforFind);
        const data = {
          total: this.total,
          employee: this.listEmployee,
          evalua: evaluation
        }
        this.dataGrading.push(data);
        return this.dataGrading;
      })
    );
  }
}

