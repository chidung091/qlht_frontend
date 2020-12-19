import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {ComparisonOperator, FilterItems, GridParam} from '../model/grid-param';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {NotiService} from './notification.service';
import {
  CreatProfessionalStandardModel, HistoryProfessionalStandardModel,
  ItemProfessionalStandardModel,
  ProfessionalStandardModel
} from '../model/professional-standard.model';
import {
  TeacherGradingFindModel,
} from '../model/teacher-grading';
import {ItemEmployeeModel} from "../model/item-employee.model";
import {concatMap, map, mergeMap} from "rxjs/operators";
import {EmployeeProfileModel} from "../model/Employee-profile";

@Injectable({
  providedIn: 'root'
})
export class ProfessionalStandardService{
  private API = `${environment.API_GATEWAY_ENDPOINT}`
  public showSpinner: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private gridParam: GridParam;
  private listEvaluation:ProfessionalStandardModel[]=[];
  total = 0;
  private listTeacherGrading: ProfessionalStandardModel[]=[];
  private listEmployee: EmployeeProfileModel[];
  private listEmployeeID: string[] = [];

  constructor(private http: HttpClient, private notiService: NotiService) {
  }
  getProfessionalStandard(facultyId: string, employeeName: string, pageSize: number, skip: number): Observable<ItemProfessionalStandardModel> {
    if (!facultyId) {
      facultyId = '';
    }
    if (!employeeName) {
      employeeName = '';
    }
    this.gridParam = new GridParam();
    this.gridParam.filterItems = [];
    this.gridParam.filterItems.push({
        value: facultyId,
        propertyName: 'facultyId',
        comparison: ComparisonOperator.Equal
      } as FilterItems,
      {
        value: employeeName,
        propertyName: 'employeeName',
        comparison: ComparisonOperator.Contains
      } as FilterItems);
    this.gridParam.sort = 'id';
    this.gridParam.sortDirection = 1;
    this.gridParam.skipCount = skip;
    this.gridParam.maxResultCount = pageSize;
    return this.http.post<ItemProfessionalStandardModel>(`${this.API}danh-gia-chuan-nghe-nghiep/phan-trang`, this.gridParam);
  }

  getProfessionalStandard1(pageSize: number, skip: number): Observable<ItemProfessionalStandardModel> {

    this.gridParam = new GridParam();
    this.gridParam.filterItems = [];
    this.gridParam.skipCount = skip;
    this.gridParam.maxResultCount = pageSize;
    return this.http.post<ItemProfessionalStandardModel>(`${this.API}danh-gia-chuan-nghe-nghiep/phan-trang`, this.gridParam);
  }

  deleteProfessionStandard(id: string[]){
    return this.http.delete<ProfessionalStandardModel>(`${this.API}danh-gia-chuan-nghe-nghiep/xoa${id}`);
  }
  PostProfessionalStandard(creatProfessionalStandard : CreatProfessionalStandardModel){
    return this.http.post<CreatProfessionalStandardModel>(`${this.API}danh-gia-chuan-nghe-nghiep/tao`, creatProfessionalStandard)
  }
  updateProfessionStandard(id:string ,historyProfessionalStandardModel:HistoryProfessionalStandardModel){
    return this.http.put<HistoryProfessionalStandardModel>(`${this.API}danh-gia-chuan-nghe-nghiep/sua/${id}`,historyProfessionalStandardModel)
  }
  deleteAllProfessionStandard(id: string[]){
    return this.http.post<ProfessionalStandardModel>(`${this.API}danh-gia-chuan-nghe-nghiep/xóa-nhiều`,id);
  }

  public mergeMapConcat(find: TeacherGradingFindModel) {
    this.gridParam = new GridParam()
    this.listTeacherGrading = [];
    this.listEvaluation = []
    this.gridParam.skipCount = find.skipCount;
    this.gridParam.maxResultCount = find.maxResultCount;
    this.gridParam.filterItems = [];
    this.gridParam.sort = 'id';
    this.gridParam.sortDirection = 0;
    this.total = 0;
    const listData  = [];
    if (find.facultyId) {
      this.gridParam.filterItems.push({
        value: find.facultyId,
        propertyName: 'facultyId',
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
      concatMap(em => {
        const inforFind = {
          employeeIds: this.listEmployeeID,
          schoolYearId: find.schoolYearID
        }
        const evaluation = this.http.post<ProfessionalStandardModel[]>(`${this.API}danh-gia-chuan-nghe-nghiep/danh-sach`, inforFind);
        return evaluation;
      }),
      mergeMap(evaluation => {
        evaluation.forEach(item => {
          this.listTeacherGrading.push(item);
        });
        // const historyGrading = this.http.get<EvaluationHistoryModel[]>
        // (`${this.API}lich-su-danh-gia-chuan-nghe-nghiep/danh-sach-theo-danh-gia/${this.listTeacherGradingId}`);
        // const evaluationList = this.http.get<EvaluationCriteriaModel[]>
        // (`${this.API}tieu-chi-danh-gia/lay-tieu-chi-theo-code/${find.evaluationGroupCode}`);
        const data = {
          total: this.total,
          employee: this.listEmployee,
          // history: historyGrading,
          // evaluation: evaluationList,
          grading: this.listTeacherGrading
        }
        listData.push(data);
        return listData;
      })
    );
  }
  PutProfessionalStandard(creatProfessionalStandard : CreatProfessionalStandardModel,id:string){
    return this.http.put<CreatProfessionalStandardModel>(`${this.API}danh-gia-chuan-nghe-nghiep/sua/${id}`, creatProfessionalStandard)
  }

  getProfessionalStandardByEmployeeId(employeeId:string,schoolYearId:string): Observable<ItemProfessionalStandardModel> {
    return this.http.get<any>(`${this.API}danh-gia-chuan-nghe-nghiep/ban-ghi-danh-gia/${employeeId}/${schoolYearId}`);
  }
}
