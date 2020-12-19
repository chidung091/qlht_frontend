import {CategoryActions, CategoryActionTypes} from '../_actions/category.actions';
import {Category} from '../_models/category.model';

export interface CategoryState {
  cate: Map<string, Category[]>;
  isCateLoaded: Map<string, boolean>;
  cateWithParent: Map<string, Category[]>;
  isCateWithParentLoaded: Map<string, boolean>;
  categories: Category[];
  isLoaded: boolean;
}

export const initialCategoryState: CategoryState = {
  cate: new Map<string, Category[]>(),
  isCateLoaded: new Map<string, false>(),
  cateWithParent: new Map<string, Category[]>(),
  isCateWithParentLoaded: new Map<string, false>(),
  categories: undefined,
  isLoaded: false,
};

export function cateReducer(
  state = initialCategoryState,
  action: CategoryActions
): CategoryState {
  switch (action.type) {
    case CategoryActionTypes.AllCategoriesRequested:
      return {
        ...state,
        isLoaded: false,
      };
    case CategoryActionTypes.AllCategoriesLoaded:
      const categories: Category[] = action.payload.categories;
      // state.cate.set(action.payload.cateType, categories)
      return {
        ...state,
        cate: state.cate.set(action.payload.cateType, categories),
        isCateLoaded: state.isCateLoaded.set(action.payload.cateType, true),
        isLoaded: true
      };
    case CategoryActionTypes.GetCategoriesWithParent:
      const payload = action.payload.cateCode
      return {
        ...state,
        isCateWithParentLoaded: state.isCateWithParentLoaded.set(payload, false),
        isLoaded: false,
      };
    case CategoryActionTypes.GetCategoriesWithParentLoaded:
      const categoriesWithParent: Category[] = action.payload.categories;
      return {
        ...state,
        cateWithParent: state.cateWithParent.set(action.payload.cateType, categoriesWithParent),
        isCateWithParentLoaded: state.isCateWithParentLoaded.set(action.payload.cateType, true),
        isLoaded: true
      };
    default:
      return state;
  }
}
