import { Action } from '@ngrx/store';
import { ConfigResponse } from '../_models';

export enum ConfigActionTypes {
    ConfigRequested = '[Init] Config Requested',
    ConfigLoaded = '[Init] Config Loaded'
}

export class ConfigRequested implements Action {
    readonly type = ConfigActionTypes.ConfigRequested;
}

export class ConfigLoaded implements Action {
    readonly type = ConfigActionTypes.ConfigLoaded;
    constructor(public payload: { config: ConfigResponse }) { }
}

export type ConfigActions = ConfigRequested | ConfigLoaded;
