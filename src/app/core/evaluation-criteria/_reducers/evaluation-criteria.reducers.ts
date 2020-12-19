import {EvaluationCriteriaModel} from "../_models/evaluation-criteria.model";
import {EvaluationCriteriaAction, EvaluationCriteriaType} from "../_actions/evaluation-criteria.action";

export  interface EvaluationCriteriaState {
  cate: Map<string, EvaluationCriteriaModel[]>;
  isCateLoaded: Map<string,boolean>;
  evaluations: EvaluationCriteriaModel[];
  isLoaded: boolean;
}

export const initialEvaluationCriteria: EvaluationCriteriaState = {
  cate: new Map<string, EvaluationCriteriaModel[]>(),
  isCateLoaded: new Map<string, boolean>(),
  evaluations: undefined,
  isLoaded: false
}

export function evaluationReducer(
  state = initialEvaluationCriteria,
  action: EvaluationCriteriaAction
): EvaluationCriteriaState {
  switch (action.type) {
    case EvaluationCriteriaType.AllGradingEvaluationCriteria:{
      return {
        ...state,
        isLoaded: true
      }
    }
    case EvaluationCriteriaType.GetGradingEvaluationCriteria:{
      const evaluations : EvaluationCriteriaModel[] = action.payload.evaluationCriteria;
      return {
        ...state,
          cate: state.cate.set(action.payload.code, evaluations),
          isLoaded: true
      }
    }
    default: return state;
  }
}
