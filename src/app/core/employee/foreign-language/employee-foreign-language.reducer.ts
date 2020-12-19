import {EmployeeForeignLanguageModel} from './employee-foreign-language.model';
import {EmployeeFLAction, EmployeeForeignLanguageAction} from './employee-foreign-language.action';

export interface EmployeeForeignLanguageState {
  employees: EmployeeForeignLanguageModel[];
  employee: EmployeeForeignLanguageModel;
  isLoaded: boolean;
}

export const initEmployeeForeignLanguageState: EmployeeForeignLanguageState = {
  employees: undefined,
  employee: undefined,
  isLoaded: false
}

export function employeeReducer(
  state = initEmployeeForeignLanguageState,
  action: EmployeeFLAction
): EmployeeForeignLanguageState {
  switch (action.type) {

    // Get All
    case EmployeeForeignLanguageAction.getAllEmployeeForeignLanguage:
      return {
        ...state,
        isLoaded: false
      };
    case EmployeeForeignLanguageAction.getAllEmployeeFLWithParentLoaded:
      const getEmployee: EmployeeForeignLanguageModel[] = action.payload.data.items;
      return {
        ...state,
        isLoaded: true,
        employees: getEmployee
      };

      // Create
    case EmployeeForeignLanguageAction.createEmployeeForeignLanguage:
      return {
        ...state,
        isLoaded: false
      }
    case EmployeeForeignLanguageAction.getEmployeeFLWithParentLoaded:
      const createEmployee: EmployeeForeignLanguageModel = action.payload.data;
      return {
        ...state,
        isLoaded: true,
        employee: createEmployee
      }

      // Update
    case EmployeeForeignLanguageAction.updateEmployeeForeignLanguage:
      return {
        ...state,
        isLoaded: false
      }
    case EmployeeForeignLanguageAction.getEmployeeFLWithParentLoaded:
      const updateEmployee: EmployeeForeignLanguageModel = action.payload.data;
      return {
        ...state,
        isLoaded: true,
        employee: updateEmployee
      }

      // Delete
    case EmployeeForeignLanguageAction.deleteEmployeeForeignLanguage:
      return {
        ...state,
        isLoaded: false
      }
    case EmployeeForeignLanguageAction.getEmployeeFLWithParentLoaded:
      const deleteEmployee: EmployeeForeignLanguageModel = action.payload.data;
      return {
        ...state,
        isLoaded: true,
        employee: deleteEmployee
      }

    default: return state;
  }
}
