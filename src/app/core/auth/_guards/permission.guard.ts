import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from '../../reducers';
import { getGrantedPolicy } from '../_selectors/config.selectors';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
        private router: Router,
        private store: Store<AppState>,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const { requiredPolicy } = route.data || {};
        if (!requiredPolicy) return of(true);
        return this.store.select(getGrantedPolicy(requiredPolicy)).pipe(
            tap(access => {
                if (!access) {
                    console.log('error');
                }
            })
        );
    }
}