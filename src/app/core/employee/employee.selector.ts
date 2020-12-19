import {createSelector} from '@ngrx/store';


export const selectEmployeeState = (state) => state;

export const getEmployee = createSelector(
  selectEmployeeState,
  (employee) => employee.employee
)
