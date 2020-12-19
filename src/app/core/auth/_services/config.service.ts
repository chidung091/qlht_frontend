import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ConfigResponse } from '../_models';
import { environment as env } from '../../../../environments/environment';
import { catchError, shareReplay } from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class ConfigService {
  private resourceUrl = env.API_GATEWAY_ENDPOINT;

  private configCache$?: Observable<ConfigResponse | null>;

  constructor(
      private http: HttpClient,
      private auth: OAuthService
      ) {}

  getConfig(force?: boolean): Observable<ConfigResponse | null> {
    if (!this.configCache$ || force) {
      this.configCache$ = this.fetch().pipe(
        catchError(() => {
          return of(null);
        }),
        shareReplay()
      );
    }
    return this.configCache$;
  }

  private fetch(): Observable<ConfigResponse> {
    const token = this.auth.getAccessToken();
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + token);
    return this.http.get<ConfigResponse>(
      this.resourceUrl + 'abp/application-configuration',
      { headers: httpHeaders }
    );
  }

  public fetchPromise() {
    const promise = new Promise((resolve, reject) => {
      const apiURL = this.resourceUrl + 'abp/application-configuration';
      this.http.get(apiURL)
        .toPromise()
        .then(
          (res: ConfigResponse) => {
            resolve(res);
          }, err => {
            reject(err);
          }
        );
    });
    return promise;
  }
}
