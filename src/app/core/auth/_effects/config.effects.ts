import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { AppState } from '../../reducers';
import {
  ConfigActionTypes,
  ConfigLoaded,
  ConfigRequested,
} from '../_actions/config.actions';
import { ConfigResponse } from '../_models';
import { AuthService, ConfigService } from '../_services';

@Injectable()
export class ConfigEffects {
  @Effect()
  loadConfig$ = this.actions$.pipe(
    ofType<ConfigRequested>(ConfigActionTypes.ConfigRequested),
    mergeMap(async () => await this.config.fetchPromise()),
    map((result: ConfigResponse) => {
      return new ConfigLoaded({
        config: result,
      });
    })
  );

  @Effect()
  init$: Observable<Action> = defer(() => {
    const isAuthorized = this.auth.isAuthorized;
    let observableResult = of({type: 'NO_ACTION'});
    if (isAuthorized) {
      observableResult = of(new ConfigRequested());
    }
    return observableResult;
  });

  constructor(private actions$: Actions, private config: ConfigService, private auth: AuthService, private store: Store<AppState>) {}
}
