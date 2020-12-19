import {createSelector} from '@ngrx/store';

export const selectEmployeeForeignLanguageState = (state) => state;

export const getAllEmployeeForeignLanguage = createSelector(
  selectEmployeeForeignLanguageState,
  (employee) => employee.employees
)

export const isEmployeesLoaded = createSelector(
  selectEmployeeForeignLanguageState,
  (employee) => employee.isLoaded
)

export const createEmployeeForeignLanguage = createSelector(
  selectEmployeeForeignLanguageState,
  (employee) => employee.employee
)

export const updateEmployeeForeignLanguage = createSelector(
  selectEmployeeForeignLanguageState,
  (employee) => employee.employee
)

export const deleteEmployeeForeignLanguage = createSelector(
  selectEmployeeForeignLanguageState,
  (employee) => employee.employee
)
