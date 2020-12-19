// Angular
import {Injectable} from '@angular/core';
// RxJS
import {concatMap, map} from 'rxjs/operators';
// NGRX
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Category} from '../_models/category.model';
import {
  AllCategoriesLoaded,
  AllCategoriesRequested,
  AllCategoriesWithParentLoaded,
  CategoryActionTypes,
  GetCategoriesWithParent,
} from '../_actions/category.actions';
import {CategoryService} from '../_services/category.service';

@Injectable()
export class CategoryEffects {
  cateType: string;
  cateTypeWithParent: string;

  @Effect()
  loadAllCategoriesByCode$ = this.actions$.pipe(
    ofType<AllCategoriesRequested>(CategoryActionTypes.AllCategoriesRequested),
    concatMap(({payload}) => this.cate.getCateByCode(payload.categoryCode).pipe((result) => {
      this.cateType = payload.categoryCode;
      return result;
    })),
    map((result: Category[]) => {
      return new AllCategoriesLoaded({
        cateType: this.cateType,
        categories: result,
      });
    })
  );

  @Effect()
  getCateWithParent$ = this.actions$.pipe(
    ofType<GetCategoriesWithParent>(CategoryActionTypes.GetCategoriesWithParent),
    concatMap(({payload}) => this.cate.getCateWithParent(payload.cateCode, payload.cateParentCode).pipe((result) => {
      this.cateTypeWithParent = payload.cateCode;
      return result;
    })),
    map((result: Category[]) => {
      return new AllCategoriesWithParentLoaded({
        cateType: this.cateTypeWithParent,
        categories: result,
      });
    })
  );

  constructor(private actions$: Actions, private cate: CategoryService) {
  }
}
