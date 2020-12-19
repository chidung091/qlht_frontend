// Angular
import { Injectable } from '@angular/core';
// RxJS
import { mergeMap, map, tap } from 'rxjs/operators';
import { defer, Observable, of } from 'rxjs';
// NGRX
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Year } from '../_models/year.model';
import {
  AllYearsRequested,
  AllYearsLoaded,
  YearActionTypes,
} from '../_actions/year.actions';
import { YearService } from '../_services/year.service';

@Injectable()
export class YearEffects {
  @Effect()
  loadAllYear$ = this.actions$.pipe(
    ofType<AllYearsRequested>(YearActionTypes.AllYearsRequested),
    mergeMap(() => this.year.getAll()),
    map((result: Year[]) => {
      return new AllYearsLoaded({
        years: result,
      });
    })
  );

  // @Effect()
  // init$: Observable<Action> = defer(() => {
  //   return of(new AllYearsRequested());
  // });

  constructor(private actions$: Actions, private year: YearService) {}
}
