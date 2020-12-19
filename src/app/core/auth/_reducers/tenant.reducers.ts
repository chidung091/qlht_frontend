// Actions
import { TenantActions, TenantActionTypes } from '../_actions/tenant.actions';
import { TenantInfo } from '../_models';

export interface TenantState {
  tenant: TenantInfo;
  _isTenantLoaded: boolean;
  isLoading: boolean;
  isUpdated: boolean;
}

export const initialTenantsState: TenantState = {
  tenant: undefined,
  _isTenantLoaded: false,
  isLoading: false,
  isUpdated: false,
};

export function tenantReducer(
  state = initialTenantsState,
  action: TenantActions
): TenantState {
  switch (action.type) {
    case TenantActionTypes.TenantRequested:
      return {
        ...state,
        _isTenantLoaded: false,
      };
    case TenantActionTypes.TenantLoaded:
      const tenant: TenantInfo = action.payload.tenant;
      return {
        ...state,
        tenant,
        _isTenantLoaded: true,
      };
    case TenantActionTypes.TenantReLoad:
      return {
        ...state,
        _isTenantLoaded: false,
      };
    case TenantActionTypes.TenantUpdate:
      const tenantUpdate: TenantInfo = action.tenantUpdateRequest;
      return {
        ...state,
        tenant: tenantUpdate,
        _isTenantLoaded: true,
      };
    case TenantActionTypes.TenantLoading:
      return {
        ...state,
        isLoading: action.loading,
      };
    case TenantActionTypes.TenantUpdated:
      return {
        ...state,
        isUpdated: action.update,
      };
    default:
      return state;
  }
}
