import {createSelector} from '@ngrx/store';


export const selectCommonState = (state) => state.common;

export const getAllSchoolFaculty = createSelector(
  selectCommonState,
  (state) => state.allSchoolFaculty
)

export const isAllSchoolFacultyLoaded = createSelector(
  selectCommonState,
  (state) => state.allSchoolFacultyLoaded
)

export const getAllPublicServant = createSelector(
  selectCommonState,
  (state) => state.publicServant
)

export const isPublicServantLoaded = createSelector(
  selectCommonState,
  (state) => state.publicServantLoaded
)
