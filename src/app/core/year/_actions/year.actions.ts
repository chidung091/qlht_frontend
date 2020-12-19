// NGRX
import { Action } from '@ngrx/store';
import { Year } from '../_models/year.model';


export enum YearActionTypes {
    AllYearsRequested = '[Init] All Years Requested',
    AllYearsLoaded = '[Init] All Years Loaded'
}

export class AllYearsRequested implements Action {
    readonly type = YearActionTypes.AllYearsRequested;
}

export class AllYearsLoaded implements Action {
    readonly type = YearActionTypes.AllYearsLoaded;
    constructor(public payload: { years: Year[] }) { }
}

export type YearActions = AllYearsRequested | AllYearsLoaded;
