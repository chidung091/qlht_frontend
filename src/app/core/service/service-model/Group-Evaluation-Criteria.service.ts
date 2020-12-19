import {environment} from "../../../../environments/environment";
import {GridParam} from "../model/grid-param";
import {HttpClient} from "@angular/common/http";
import {GroupEvaluationCriteria} from "../model/group-evaluation-criteria";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class GroupEvaluationCriteriaService{
  private API = `${environment.API_GATEWAY_ENDPOINT}`;
  private inforFind: GridParam;
  constructor(private http: HttpClient) { }

  getGroupEvaluate(){
    return this.http.get<GroupEvaluationCriteria[]>(`${this.API}nhom-tieu-chi-danh-gia/tat-ca`)
  }

}

