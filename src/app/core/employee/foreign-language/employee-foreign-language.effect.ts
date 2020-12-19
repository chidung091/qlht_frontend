import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {concatMap, map, mergeMap} from 'rxjs/operators';
import {EmployeeForeignLanguageService} from './employee-foreign-language.service';
import {
  CreateEmployeeForeignLanguage, DeleteEmployeeForeignLanguage,
  EmployeeFLWithParentLoaded,
  EmployeeForeignLanguageAction,
  GetAllEmployeeRequest, ListEmployeeFLWithParentLoaded, UpdateEmployeeForeignLanguage
} from './employee-foreign-language.action';
import {EmployeeForeignLanguageModel, ListEmployeeForeignLanguageModel} from './employee-foreign-language.model';

@Injectable()
export class EmployeeForeignLanguageEffect {
  empType: string;
  empTypeWithParent: string;

  @Effect()
  loadAllEmployeeByFilter$ = this.actions$.pipe(
    ofType<GetAllEmployeeRequest>(EmployeeForeignLanguageAction.getAllEmployeeForeignLanguage),
    mergeMap(({payload}) =>
      this.employeeForeignLanguageService.getAllEmployeeForeignLangague(payload.employee.employeeId, payload.employee.skipCount, payload.employee.maxResultCount).pipe((result) => {
        return result;
      })), map((result: ListEmployeeForeignLanguageModel) => {
      return new ListEmployeeFLWithParentLoaded(
        {
          data: result
        }
      )
    })
  );

  @Effect()
  createEmployeeForeignLanguage$ = this.actions$.pipe(
    ofType<CreateEmployeeForeignLanguage>(EmployeeForeignLanguageAction.createEmployeeForeignLanguage),
    mergeMap(({payload}) =>
      this.employeeForeignLanguageService.addEmployeeForeignLanguage(payload.emId, payload.employee).pipe(result => {
        return result;
      })), map((dataRes: EmployeeForeignLanguageModel) => {
      return new EmployeeFLWithParentLoaded(
        {
          data: dataRes
        }
      )
    })
  )

  @Effect()
  updateEmployeeForeignLanguage$ = this.actions$.pipe(
    ofType<UpdateEmployeeForeignLanguage>(EmployeeForeignLanguageAction.updateEmployeeForeignLanguage), mergeMap(({payload}) =>
      this.employeeForeignLanguageService.editEmployeeForeignLanguage(payload.emId, payload.employee).pipe(result => {return result;})),
    map((dataRes: EmployeeForeignLanguageModel) => {
      return new EmployeeFLWithParentLoaded({
        data: dataRes
      })
    })
  )

  @Effect()
  deleteEmployeeForeignLanguage$ = this.actions$.pipe(
    ofType<DeleteEmployeeForeignLanguage>(EmployeeForeignLanguageAction.deleteEmployeeForeignLanguage), mergeMap(({payload}) =>
      this.employeeForeignLanguageService.deleteEmployeeForeignLanguage(payload.emId, payload.childId).pipe(result => {return result})),
    map((dataRes: EmployeeForeignLanguageModel) => {
      return new EmployeeFLWithParentLoaded({
        data: dataRes
      })
    })
  )

  constructor(private actions$: Actions, private employeeForeignLanguageService: EmployeeForeignLanguageService) {
  }
}
