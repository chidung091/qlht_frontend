import {EmployeeModel} from './employee.model';
import {EmployeeAction, EmployeeActionType} from './employee.action';

export interface EmployeeState {
  employee: EmployeeModel
}

export const initEmployeeState: EmployeeState = {
  employee: null,
}

export function employeeReducer(
  state = initEmployeeState,
  action: EmployeeAction
): EmployeeState {
  switch (action) {
    default: return state;
  }
}
