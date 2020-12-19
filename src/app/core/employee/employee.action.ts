import {Action} from '@ngrx/store';
import {EmployeeModel} from './employee.model';

export enum EmployeeActionType {
  createEmployee = '[Employee] Create employee',
}

export class CreateEmployee implements Action {
  readonly type = EmployeeActionType.createEmployee;
  constructor(public payload: {employee: EmployeeModel}) {}
}

export type EmployeeAction = CreateEmployee;
