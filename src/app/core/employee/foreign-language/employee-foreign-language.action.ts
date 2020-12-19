import {Action} from '@ngrx/store';
import {EmployeeForeignLanguageModel, FilterEmployeeModel, ListEmployeeForeignLanguageModel} from './employee-foreign-language.model';

export enum EmployeeForeignLanguageAction {
  createEmployeeForeignLanguage = '[EmployeeForeignLanguage] Create Employee Foreign Language',
  getAllEmployeeForeignLanguage = '[EmployeeForeignLanguage] Get All Employee Foreign Language',
  updateEmployeeForeignLanguage = '[EmployeeForeignLanguage] Update Employee Foreign Language',
  deleteEmployeeForeignLanguage = '[EmployeeForeignLanguage] Delete Employee Foreign Language',
  getAllEmployeeFLWithParentLoaded = '[EmployeeForeignLanguage] Loader All Employee Foreign Language',
  getEmployeeFLWithParentLoaded = '[EmployeeForeignLanguage] Loader Employee Foreign Language',
}

export class GetAllEmployeeRequest implements Action {
  readonly type = EmployeeForeignLanguageAction.getAllEmployeeForeignLanguage;
  constructor(public payload: {employee: FilterEmployeeModel}) {
  }
}

export class CreateEmployeeForeignLanguage implements Action {
  readonly type = EmployeeForeignLanguageAction.createEmployeeForeignLanguage;
  constructor(public payload: {emId: string, employee: EmployeeForeignLanguageModel}) {}
}

export class UpdateEmployeeForeignLanguage implements Action {
  readonly type = EmployeeForeignLanguageAction.updateEmployeeForeignLanguage;
  constructor(public payload: {emId: string, employee: EmployeeForeignLanguageModel}) {
  }
}

export class DeleteEmployeeForeignLanguage implements Action {
  readonly type = EmployeeForeignLanguageAction.deleteEmployeeForeignLanguage;
  constructor(public payload: {emId: string, childId: string}) {
  }
}

export class ListEmployeeFLWithParentLoaded implements Action {
  readonly type = EmployeeForeignLanguageAction.getAllEmployeeFLWithParentLoaded;
  constructor(public payload: { data: ListEmployeeForeignLanguageModel }) { }
}

export class EmployeeFLWithParentLoaded implements Action {
  readonly type = EmployeeForeignLanguageAction.getEmployeeFLWithParentLoaded;
  constructor(public payload: { data: EmployeeForeignLanguageModel }) {
  }
}

export type EmployeeFLAction = GetAllEmployeeRequest | CreateEmployeeForeignLanguage
  | UpdateEmployeeForeignLanguage | DeleteEmployeeForeignLanguage | EmployeeFLWithParentLoaded | ListEmployeeFLWithParentLoaded;
