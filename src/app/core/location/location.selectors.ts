import {createSelector} from '@ngrx/store';


export const selectLocationState = (state) => state.location;

export const getAllProvinces = createSelector(
  selectLocationState,
  (state) => state.allProvinces
)

export const isProvincesLoaded = createSelector(
  selectLocationState,
  (state) => state.provinceLoaded
)

export const getDistrictsByProvinceCode = createSelector(
  selectLocationState,
  (state) => state.districtsByProvinceCode
)

export const isDistrictsLoaded = createSelector(
  selectLocationState,
  (state) => state.districtLoaded
)

export const getWardsByDistrictCode = createSelector(
  selectLocationState,
  (state) => state.wardsByDistrictCode
)

export const isWardsLoaded = createSelector(
  selectLocationState,
  (state) => state.wardLoaded
)
