import { YearActions, YearActionTypes } from '../_actions/year.actions';
import { Year } from '../_models/year.model';

export interface YearState {
  years: Year[];
  isLoaded: boolean;
}

export const initialYearState: YearState = {
  years: undefined,
  isLoaded: false,
};

export function yearReducer(
  state = initialYearState,
  action: YearActions
): YearState {
  switch (action.type) {
    case YearActionTypes.AllYearsRequested:
      return {
        ...state,
        isLoaded: false,
      };
    case YearActionTypes.AllYearsLoaded:
      const years: Year[] = action.payload.years;
      return {
        ...state,
        years,
        isLoaded: true,
      };
    default:
      return state;
  }
}
