import {createSelector} from "@ngrx/store";
import {EvaluationCriteriaModel} from "../_models/evaluation-criteria.model";
import {EvaluationCriteriaState} from "../_reducers/evaluation-criteria.reducers";

export const selectCateSate = (state) => state.evaluation;

export const isCateLoaded = createSelector(
  selectCateSate,
  (cate) => cate.isLoaded
)

export const getCateEvaluation = createSelector(
  selectCateSate,
  (cate: EvaluationCriteriaState, key: string) => {
    return cate.cate?.get(key);
  }
)
