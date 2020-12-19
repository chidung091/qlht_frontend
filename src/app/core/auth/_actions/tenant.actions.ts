import { Action } from '@ngrx/store';
import { TenantInfo } from '../_models';


export enum TenantActionTypes {
    TenantRequested = '[Init] Tenant Requested',
    TenantReLoad = '[Init] Tenant ReLoad',
    TenantLoaded = '[Init] Tenant Loaded',
    TenantUpdate = '[Tenant] Tenant Update',
    TenantLevelRequested = '[Tenant] Tenant Tenant Level Requested',
    TenantLevelLoaded = '[Tenant] Tenant Tenant Level Loaded',
    TenantLoading = '[Tenant] Tenant loading',
    TenantUpdated = '[Tenant] Tenant updated'
}

export class TenantRequested implements Action {
    readonly type = TenantActionTypes.TenantRequested;
}

export class TenantLoaded implements Action {
    readonly type = TenantActionTypes.TenantLoaded;
    constructor(public payload: { tenant: TenantInfo }) { }
}

export class TenantReLoad implements Action {
    readonly type = TenantActionTypes.TenantReLoad;
}

export class TenantUpdate implements Action {
  readonly type = TenantActionTypes.TenantUpdate;
  constructor(public id: string, public tenantUpdateRequest: TenantInfo) {
  }
}

export class TenantLoading implements Action {
  readonly type = TenantActionTypes.TenantLoading;
  constructor(public loading: boolean) {
  }
}

export class TenantUpdated implements Action {
  readonly type = TenantActionTypes.TenantUpdated;
  constructor(public update: boolean) {
  }
}

export type TenantActions = TenantRequested | TenantLoaded |
  TenantUpdate | TenantReLoad | TenantLoading | TenantUpdated;
