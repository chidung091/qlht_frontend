import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, finalize, map, mergeMap} from 'rxjs/operators';
import {
  TenantActionTypes,
  TenantLoaded,
  TenantLoading,
  TenantReLoad,
  TenantUpdate,
  TenantUpdated,
} from '../_actions/tenant.actions';
import {TenantInfo} from '../_models';
import {AuthService, TenantService} from '../_services';
import {NotiService} from '../../service/service-model/notification.service';
import {AppState} from '../../reducers';
import {locale} from '../../_config/i18n/vi';

@Injectable()
export class TenantEffects {

  isError: boolean;

  @Effect({dispatch: false})
  updateTenantInfo$ = this.actions$.pipe(
    ofType<TenantUpdate>(TenantActionTypes.TenantUpdate),
    mergeMap(({id, tenantUpdateRequest}) => {
      this.isError = false;
      this.store.dispatch(new TenantLoading(true));
      this.store.dispatch(new TenantUpdated(false));
      return this.tenant.updateTenantInfo(id, tenantUpdateRequest)
        .pipe((result) => {
        return result;
      }, catchError((err) => {
        this.isError = true;
        this.store.dispatch(new TenantLoading(false));
        throw err;
      }), finalize(() => {
          if (!this.isError) {
            this.store.dispatch(new TenantLoading(false));
            this.store.dispatch(new TenantUpdated(true));
            this.store.dispatch(new TenantLoaded({tenant: tenantUpdateRequest}))
            this.notiService.updateSuccess();
          }
        }));
    }),
  );

  @Effect()
  reloadTenantInfo$ = this.actions$.pipe(
    ofType<TenantReLoad>(TenantActionTypes.TenantReLoad),
    mergeMap(() => this.tenant.getTenantInfo(true)),
    map((result: TenantInfo) => {
      return new TenantLoaded({
        tenant: result,
      });
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private tenant: TenantService,
    private notiService: NotiService
  ) {
  }
}
