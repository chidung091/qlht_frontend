// NGRX
import { Action } from '@ngrx/store';
import { Category } from '../_models/category.model';


export enum CategoryActionTypes {
    AllCategoriesRequested = '[Init] All Categories By Code Requested',
    AllCategoriesLoaded = '[Init] All Categories By Code Loaded',
    GetCategoriesWithParent = '[Init] Get categories with parent',
    GetCategoriesWithParentLoaded = '[Init] Categories with parent',
}

export class AllCategoriesRequested implements Action {
    readonly type = CategoryActionTypes.AllCategoriesRequested;
    constructor(public payload: { categoryCode: string }) { }
}

export class AllCategoriesLoaded implements Action {
    readonly type = CategoryActionTypes.AllCategoriesLoaded;
    constructor(public payload: { cateType: string, categories: Category[] }) { }
}

export class GetCategoriesWithParent implements Action {
  readonly type = CategoryActionTypes.GetCategoriesWithParent;
  constructor(public payload: {cateCode: string, cateParentCode: string}) {}
}
export class AllCategoriesWithParentLoaded implements Action {
  readonly type = CategoryActionTypes.GetCategoriesWithParentLoaded;
  constructor(public payload: { cateType: string, categories: Category[] }) { }
}

export type CategoryActions = AllCategoriesRequested | AllCategoriesLoaded |
  GetCategoriesWithParent | AllCategoriesWithParentLoaded;
