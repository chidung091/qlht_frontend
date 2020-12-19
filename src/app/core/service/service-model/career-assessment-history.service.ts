import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {GridParam} from "../model/grid-param";
import {HttpClient} from "@angular/common/http";
import {EvaluationHistoryModel} from "../model/professional-standard.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CareerAssessmentHistoryService{
  private API = `${environment.API_GATEWAY_ENDPOINT}`;
  private inforFind: GridParam;
  constructor(private http: HttpClient) { }

  getAssessmentHistory(id : string) : Observable<EvaluationHistoryModel[]>{
    return this.http.get<EvaluationHistoryModel[]>(`${this.API}lich-su-danh-gia-chuan-nghe-nghiep/danh-sach-theo-danh-gia/${id}`)
  }

  getAssessmentHistoryByEmployeeId(employeeId: string,schoolYearId:string)  : Observable<EvaluationHistoryModel[]>{
    return this.http.get<EvaluationHistoryModel[]>(`${this.API}lich-su-danh-gia-chuan-nghe-nghiep/ban-ghi-danh-gia/${employeeId}/${schoolYearId}`)
  }
  updateAssessmentHistory(evaluationHistoryModel: EvaluationHistoryModel[]){
    return this.http.put<EvaluationHistoryModel>(`${this.API}lich-su-danh-gia-chuan-nghe-nghiep/sua`,evaluationHistoryModel)
  }
}
