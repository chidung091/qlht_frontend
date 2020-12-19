import {Action} from '@ngrx/store';
import {EmployeeSalary} from './salary-employee.model';


export enum EmployeeSalaryActionType {
  listEmployeeSalary = '[EmployeeSalary] List employee',
  createEmployeeSalary = '[EmployeeSalary] Create employee',
  deleteEmployeeSalary = '[EmployeeSalary] Delete employee',
}
export class ListEmployeeSalary implements Action {
  readonly type = EmployeeSalaryActionType.listEmployeeSalary;
  constructor(public payload: {employee: EmployeeSalary}) {}
}

export class CreateEmployeeSalary implements Action {
  readonly type = EmployeeSalaryActionType.createEmployeeSalary;
  constructor(public payload: {employee: EmployeeSalary}) {}
}

export type EmployeeSalaryAction = CreateEmployeeSalary;
