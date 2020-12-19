import { createSelector } from '@ngrx/store';
import snq from 'snq';
import * as _ from 'lodash';

export const selectConfigState = (state) => state.config;

export const isConfigLoaded = createSelector(
  selectConfigState,
  (state) => state._isConfigLoaded
);

export const currentConfig = createSelector(
  selectConfigState,
  (state) => state.config
);

export const currentUser = createSelector(
  currentConfig,
  (config) => config?.currentUser
);

export const selectRoles = createSelector(currentUser, (user) => user?.roles);

export const selectAuth = createSelector(
  currentConfig,
  (config) => config?.auth
);

export const selectGrantedPolicies = createSelector(
  selectAuth,
  (auth) => auth?.grantedPolicies
);

export const selectPolicies = createSelector(
  selectAuth,
  (auth) => auth.policies
);

export const getGrantedPolicy = (key: string) =>
  createSelector(selectGrantedPolicies, (grantedPolicies) => {
    if (!key) return true;
    const getPolicy = (k: string) => snq(() => grantedPolicies[k], false);
    const orRegexp = /\|\|/g;
    const andRegexp = /&&/g;

    if (orRegexp.test(key)) {
      const keys = key.split('||').filter(Boolean);

      if (keys.length < 2) return false;

      return keys.some((k) => getPolicy(k.trim()));
    } else if (andRegexp.test(key)) {
      const keys = key.split('&&').filter(Boolean);

      if (keys.length < 2) return false;

      return keys.every((k) => getPolicy(k.trim()));
    }
    return getPolicy(key);
});

export const getRoles = (key: string) =>
  createSelector(selectRoles, (roles) => {
    if (!key) return true;
    const getRole = (k: string) => snq(() => roles[k], false);
    const orRegexp = /\|\|/g;
    const andRegexp = /&&/g;

    if (orRegexp.test(key)) {
      const keys = key.split('||').filter(Boolean);

      if (keys.length < 2) return false;

      return keys.some((k) => getRole(k.trim()));
    } else if (andRegexp.test(key)) {
      const keys = key.split('&&').filter(Boolean);

      if (keys.length < 2) return false;

      return keys.every((k) => getRole(k.trim()));
    }
    return getRole(key);
});
