import {
  YearLevelSelectorActions,
  YearLevelSelectorActionTypes,
} from '../_actions/year-level-selector.actions';

export interface YearLevelSelectorState {
  yearSelected: any;
  levelSelected: any
}

export const initialYearLevelSelectorState: YearLevelSelectorState = {
  yearSelected: undefined,
  levelSelected: undefined
};

export function yearLevelSelectorReducer(
  state = initialYearLevelSelectorState,
  action: YearLevelSelectorActions
): YearLevelSelectorState {
  switch (action.type) {
    case YearLevelSelectorActionTypes.YearSelector:
      const yearSelected: any = action.payload.yearSelected;
      return {
        ...state,
        yearSelected,
      };
    case YearLevelSelectorActionTypes.LevelSelector:
      const levelSelected: any = action.payload.levelSelected;
      return {
        ...state,
        levelSelected,
      };
    default:
      return state;
  }
}
