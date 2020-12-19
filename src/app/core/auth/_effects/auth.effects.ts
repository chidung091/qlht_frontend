// Angular
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// RxJS
import { filter, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { defer, forkJoin, Observable, of } from 'rxjs';
// NGRX
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
// Auth actions
import {
  AuthActionTypes,
  Login,
  Logout,
  Register,
  UserLoaded,
  UserRequested,
} from '../_actions/auth.actions';
import { AuthService, TenantService } from '../_services/index';
import { AppState } from '../../reducers';
import { environment } from '../../../../environments/environment';
import { isUserLoaded } from '../_selectors/auth.selectors';
import { ConfigRequested } from '../_actions/config.actions';
import { TenantLoaded } from '..';
import { AllYearsRequested } from '../../year';

@Injectable()
export class AuthEffects {
  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.Login),
    tap(() => {
      // sessionStorage.setItem(environment.authTokenKey, action.payload.authToken);
      this.store.dispatch(new UserRequested());
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.Logout),
    tap(() => {
      this.auth.logoff();
      this.router.navigate(['/auth/login'], {
        queryParams: { returnUrl: this.returnUrl },
      });
      document.location.reload();
    })
  );

  @Effect({ dispatch: false })
  register$ = this.actions$.pipe(
    ofType<Register>(AuthActionTypes.Register),
    tap((action) => {
      sessionStorage.setItem(
        environment.authTokenKey,
        action.payload.authToken
      );
    })
  );

  @Effect({ dispatch: false })
  loadUser$ = this.actions$.pipe(
    ofType<UserRequested>(AuthActionTypes.UserRequested),
    withLatestFrom(this.store.pipe(select(isUserLoaded))),
    filter(([, _isUserLoaded]) => !_isUserLoaded),
    mergeMap(([, _isUserLoaded]) => {
      const userProfile = this.auth.getUserByToken();
      const tenant = this.tenant.getTenantInfo();
      return forkJoin(userProfile, tenant);
    }),
    tap(([_userProfile, _tenant]) => {
      if (_userProfile && _tenant) {
        this.store.dispatch(new ConfigRequested());
        this.store.dispatch(new UserLoaded({ user: _userProfile }));
        this.store.dispatch(new TenantLoaded({ tenant: _tenant }));
        this.store.dispatch(new AllYearsRequested());
      } else {
        this.store.dispatch(new Logout());
      }
    })
  );

  @Effect()
  init$: Observable<Action> = defer(() => {
    const isAuthorized = this.auth.isAuthorized;
    let observableResult = of({ type: 'NO_ACTION' });
    if (isAuthorized) {
      observableResult = of(new Login());
    }
    return observableResult;
  });

  private returnUrl: string;

  constructor(
    private actions$: Actions,
    private router: Router,
    private auth: AuthService,
    private tenant: TenantService,
    private store: Store<AppState>
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.returnUrl = event.url;
      }
    });
  }
}
