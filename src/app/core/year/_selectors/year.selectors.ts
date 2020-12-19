import * as _ from 'lodash';

import { createSelector } from '@ngrx/store';
import { Year } from '../_models/year.model';

export const selectYearState = (state) => state.year;

export const isYearsLoaded = createSelector(
  selectYearState,
  (state) => state.isLoaded
);

export const schoolYears = createSelector(
  selectYearState,
  (state) => state.years
);

export const currentYear = createSelector(
  schoolYears,
  (years) => {
    let result = new Year();
    _.findLast(years, (year: Year) => {
      if(year.currentYear){
        return result = year;
      }
    });
    return result;
  }
);


