import {EmployeeSalary} from './salary-employee.model';
import {EmployeeSalaryAction, EmployeeSalaryActionType} from './salary-employee.action';

export interface EmployeeSalaryState {
  employeeSalary: EmployeeSalary
}

export const initEmployeeState: EmployeeSalaryState = {
  employeeSalary: null,
}

export function employeeSalaryReducer(
  state = initEmployeeState,
  action: EmployeeSalaryAction
): EmployeeSalaryState {
  switch (action.type) {
    case EmployeeSalaryActionType.createEmployeeSalary:
      return {
        ...state,
        employeeSalary: action.payload.employee
      };
    default: return state;
  }
}
