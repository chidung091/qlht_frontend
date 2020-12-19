// NGRX

import { createSelector } from '@ngrx/store';
import { each } from 'lodash';
import { Place, TenantInfo } from '../_models';

export const selectTenantState = (state) => state.tenant;

export const isTenantLoaded = createSelector(
  selectTenantState,
  (tenant) => tenant._isTenantLoaded
);

export const currentTenant = createSelector(
  selectTenantState,
  (state) => state.tenant
);

export const tenantState = createSelector(
  selectTenantState,
  (state) => state
)

export const getFullSchoolPlace = createSelector(
  currentTenant,
  (tenantInfo: TenantInfo) => tenantInfo?.schoolPlaces
)

export const getSchoolImg = createSelector(
  currentTenant,
  (tenantInfo: TenantInfo) => tenantInfo?.imageSrc
);

export const extraProperty = createSelector(
  currentTenant,
  (tenantInfo: TenantInfo) => {
    return tenantInfo?.extraProperties
  }
);

export const selectSchoolPlaces = createSelector(
  currentTenant,
  (tenantInfo: TenantInfo) => {
    const result: Place[] = [];
    const placePrimary: Place = {
      id: tenantInfo?.id,
      name: tenantInfo?.name,
      primary: true
    }
    result.push(placePrimary);
    each(tenantInfo?.schoolPlaces, data => {
      const place: Place = {
        id: data.id,
        name: data.schoolPlaceName,
        primary: false
      }
      result.push(place);
    });
    return result
  }
);


export const selectSchoolLevels = createSelector(
  currentTenant,
  (tenantInfo: TenantInfo) => {
    return tenantInfo?.schoolLevels
  }
);
