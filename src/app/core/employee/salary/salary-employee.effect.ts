import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AllCategoriesWithParentLoaded, Category, CategoryActionTypes, GetCategoriesWithParent} from '../../category';
import {concatMap, map, mergeMap} from 'rxjs/operators';
import {CategoryService} from '../../category/_services/category.service';
import {CreateEmployeeSalary, EmployeeSalaryActionType} from "./salary-employee.action";
import {EmployeeSalaryService} from "./salary-employee.service";
import {EmployeeSalary} from "./salary-employee.model";

@Injectable()
export class EmployeeSalaryEffects {
  cateTypeSalaryEmployee: string;

  @Effect()
  cateTypeSalaryEmployee$ = this.actions$.pipe(
    ofType<CreateEmployeeSalary>(EmployeeSalaryActionType.createEmployeeSalary),
    mergeMap(({payload}) => this.cate.createEmployeeSalary(payload.employee)),
    map((result: EmployeeSalary) => {
      return new CreateEmployeeSalary({
        employee: result,
      });
    })
  );

  constructor(private actions$: Actions, private cate: EmployeeSalaryService) {
  }
}
