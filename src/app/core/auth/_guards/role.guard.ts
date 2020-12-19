import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from '../../reducers';
import { getRoles } from '../_selectors/config.selectors';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private store: Store<AppState>,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const { requiredRoles } = route.data.requiredRoles || [];
        if (!requiredRoles) return of(true);
        return this.store.select(getRoles(requiredRoles)).pipe(
            tap(access => {
                if (!access) {
                    console.log('Error');
                }
            })
        );
    }
}