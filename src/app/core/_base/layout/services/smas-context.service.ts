import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import { SmasConText } from '../models/smas-context.model';
import { merge } from 'lodash';
import {Store} from '@ngrx/store';
import {AppState} from '../../../reducers';
import {GetCategoriesWithParent} from '../../../category';
import {CategoryType} from '../../../_constants';
import {Year} from '../../../year';

const smasConTextStorageKey = 'smasConText';

@Injectable()
export class SmasContextService {
  onConfigUpdated$: Subject<SmasConText>;
  smasConText: SmasConText;
  yearUpdate$ = new  BehaviorSubject<Year>(undefined)

  constructor(
    private store: Store<AppState>
  ) {
    this.onConfigUpdated$ = new Subject();
  }

  saveSmasConText(smasConText: SmasConText): void {
    if (smasConText) {
      sessionStorage.setItem(
        smasConTextStorageKey,
        JSON.stringify(smasConText)
      );
    }
  }

  getSavedSmasConText(): SmasConText {
    const smasContext = sessionStorage.getItem(smasConTextStorageKey);
    try {
      return JSON.parse(smasContext);
    } catch (e) {}
  }

  getSmasConText(): SmasConText {
    return this.getSavedSmasConText();
  }

  setSmasConText(value: any, save?: boolean, isChangeLevel?: boolean, isYearUpdate?: boolean): void {
    const smasContextStorage = this.getSmasConText();
    this.smasConText = merge(this.smasConText, smasContextStorage);
    this.smasConText = merge(this.smasConText, value);

    if (save) {
      this.saveSmasConText(this.smasConText);
    }

    if (isChangeLevel) {
      this.store.dispatch(new GetCategoriesWithParent({
        cateCode: CategoryType.DM_KHOI,
        cateParentCode: this.getSmasConText().level.schoolLevelCode
      }))
    }

    if (isYearUpdate) {
      this.yearUpdate$.next(this.smasConText.year)
    }
    this.onConfigUpdated$.next(this.smasConText);
  }
}
