// NGRX
import { Action } from '@ngrx/store';


export enum YearLevelSelectorActionTypes {
    YearSelector = '[Update] Year Selector',
    LevelSelector = '[Update] Level Selector'
}

export class YearSelector implements Action {
    readonly type = YearLevelSelectorActionTypes.YearSelector;
    constructor(public payload: { yearSelected: any }) { }
}

export class LevelSelector implements Action {
    readonly type = YearLevelSelectorActionTypes.LevelSelector;
    constructor(public payload: { levelSelected: any }) { }
}

export type YearLevelSelectorActions = YearSelector | LevelSelector
