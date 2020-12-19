import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { environment as env } from '../../../../environments/environment';
import { Year } from '../_models/year.model';

@Injectable()
export class YearService {
  private resourceUrl = env.API_GATEWAY_ENDPOINT;

  private yearsCache$?: Observable<Year[] | null>;

  constructor(private http: HttpClient) {}

  getAll(force?: boolean): Observable<Year[] | null> {
    if (!this.yearsCache$ || force) {
      this.yearsCache$ = this.fetch().pipe(
        catchError(() => {
          return of(null);
        }),
        shareReplay()
      );
    }
    return this.yearsCache$;
  }

  fetch(): Observable<Year[]> {
    return this.http.get<Year[]>(this.resourceUrl + 'nam-hoc/tat-ca');
  }
}
