// NGRX
import { createSelector } from '@ngrx/store';

export const selectYearLevelSelectorState = (state) => state.selected;

export const yearSelected = createSelector(
  selectYearLevelSelectorState,
  (state) => state.yearSelected
);

export const levelSelected = createSelector(
  selectYearLevelSelectorState,
  (state) => state.levelSelected
);

export const currentYearAndLevel = createSelector(
  yearSelected,
  levelSelected,
  (state) => {
    debugger
    console.log(state)
    return state;
  }
);
