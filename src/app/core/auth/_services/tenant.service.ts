import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TenantInfo } from '../_models';
import { environment as env } from '../../../../environments/environment';
import { catchError, shareReplay } from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class TenantService {
  private resourceUrl = env.API_GATEWAY_ENDPOINT;

  private tenantCache$?: Observable<TenantInfo | null>;

  constructor(
    private http: HttpClient,
    private auth: OAuthService
  ) {}

  getTenantInfo(force?: boolean): Observable<TenantInfo | null> {
    if (!this.tenantCache$ || force) {
      this.tenantCache$ = this.fetch().pipe(
        catchError(() => {
          return of(null);
        }),
        shareReplay()
      );
    }
    return this.tenantCache$;
  }

  private fetch(): Observable<TenantInfo> {
    const token = this.auth.getAccessToken();
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + token);
    return this.http.get<TenantInfo>(
      this.resourceUrl + 'multi-tenancy/tenant-by-user/current',
      { headers: httpHeaders }
    );
  }

  updateTenantInfo(id: string, tenantUpdateRq: TenantInfo) {
    const token = this.auth.getAccessToken();
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + token);
    return this.http.put<TenantInfo>(
      this.resourceUrl + 'multi-tenancy/tenants/' + id,
      tenantUpdateRq,
      { headers: httpHeaders }
    );
  }
}
