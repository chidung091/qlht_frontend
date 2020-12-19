import {createSelector} from '@ngrx/store';

export const selectEmployeeSalaryState = (state) => state;

export const getEmployee = createSelector(
  selectEmployeeSalaryState,
  (employeeSalary) => employeeSalary.employeeSalary
)
