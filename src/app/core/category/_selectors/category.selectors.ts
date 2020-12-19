// NGRX

import { createSelector } from '@ngrx/store';
import {CategoryState} from '..';

export const selectCateState = (state) => state.cate;

export const isCateLoaded = createSelector(
  selectCateState,
  (cate) => cate.isLoaded
);

export const currentCate = createSelector(
  selectCateState,
  (cate) => cate.categories
);

export const getCate = createSelector(
  selectCateState,
  (cate: CategoryState, key: string) => {
    return cate.cate?.get(key);
  }
)

export const getCateLoaded = createSelector(
  selectCateState,
  (cate: CategoryState, key: string) => {
    return cate.isCateLoaded?.get(key);
  }
)

export const getCateWithParent = createSelector(
  selectCateState,
  (cate: CategoryState, key: string) => {
    return cate.cateWithParent?.get(key);
  }
)

export const getCateWithParentLoaded = createSelector(
  selectCateState,
  (cate: CategoryState, key: string) => {
    return cate.isCateWithParentLoaded?.get(key)
  }
)
