import { Action } from '@ngrx/store';

export enum RestErrorActionTypes {
    RestError = '[Rest] Error'
}

export class RestError implements Action {
    readonly type = RestErrorActionTypes.RestError;
}