import {Injectable} from "@angular/core";
import {environment as env} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EvaluationCriteriaModel} from "../_models/evaluation-criteria.model";

@Injectable({providedIn: 'root'})
export class EvaluationCriteriaService {
  private resourceUrl = env.API_GATEWAY_ENDPOINT;
  constructor(
    private http: HttpClient
  ){}

  getEvaluationByCode(code: string): Observable<EvaluationCriteriaModel[]> {
    return this.http.get<EvaluationCriteriaModel[]>(this.resourceUrl + `tieu-chi-danh-gia/tieu-chi/${code}`);
  }
}
