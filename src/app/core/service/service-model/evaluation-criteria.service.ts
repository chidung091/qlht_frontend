import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {GridParam} from "../model/grid-param";
import {HttpClient} from "@angular/common/http";
import {EvaluationCriteriaModel} from "../model/evaluation-criteria.model";

@Injectable({
  providedIn: 'root'
})
export class EvaluationCriteriaService{
  private API = `${environment.API_GATEWAY_ENDPOINT}`;
  private inforFind: GridParam;
  constructor(private http: HttpClient) { }

  getEvaluate(code:string){
    return this.http.get<EvaluationCriteriaModel[]>(`${this.API}tieu-chi-danh-gia/tieu-chi/${code}`)
  }
}
