import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {EvaluationCriteriaService} from "../_services/evaluation-criteria.service";
import {
  AllEvaluationCriteriaByCode,
  EvaluationCriteriaType,
  GetEvaluationCriteriaLoaded
} from "../_actions/evaluation-criteria.action";
import {concatMap, map} from "rxjs/operators";
import {EvaluationCriteriaModel} from "../_models/evaluation-criteria.model";

@Injectable()
export class EvaluationCriteriaEffects {
  code: string;

  constructor(private actions$: Actions, private cate: EvaluationCriteriaService) {
  }

  @Effect()
  loadAllEvaluationCriteria = this.actions$.pipe(
    ofType<AllEvaluationCriteriaByCode>(EvaluationCriteriaType.AllGradingEvaluationCriteria),
    concatMap(({payload}) => this.cate.getEvaluationByCode(payload.code).pipe((result) => {
      this.code = payload.code;
      return result;
    })),
    map((result: EvaluationCriteriaModel[]) => {
      return new GetEvaluationCriteriaLoaded({
        code: this.code,
        evaluationCriteria: result
      })
    })
  );
}
