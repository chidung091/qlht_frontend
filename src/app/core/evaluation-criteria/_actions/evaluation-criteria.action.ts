import {Action} from "@ngrx/store";
import {EvaluationCriteriaModel} from "../_models/evaluation-criteria.model";

export enum EvaluationCriteriaType {
  AllGradingEvaluationCriteria = '[Evaluation] All evaluation of grading',
  GetGradingEvaluationCriteria = '[Evaluation] Get evaluation of grading',

}
export class AllEvaluationCriteriaByCode implements Action{
  readonly type = EvaluationCriteriaType.AllGradingEvaluationCriteria;
  constructor(public payload: { code: string }) { }
}

export class GetEvaluationCriteriaLoaded implements Action{
  readonly type = EvaluationCriteriaType.GetGradingEvaluationCriteria;
  constructor(public payload: { code: string , evaluationCriteria: EvaluationCriteriaModel[] }) {
  }
}
export type EvaluationCriteriaAction = AllEvaluationCriteriaByCode | GetEvaluationCriteriaLoaded;
