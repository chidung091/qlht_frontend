// Angular
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
// RxJS
import { tap } from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';
import { NotiService } from '../../../service/service-model/notification.service';
@Injectable()
export class InterceptService implements HttpInterceptor {
  constructor(private notiService: NotiService, private auth: OAuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next
      .handle(
        request.clone({
          setHeaders: this.getAdditionalHeaders(request.headers),
        })
      )
      .pipe(
        tap(
          (event) => {
            if (event instanceof HttpResponse) {}
          },
          (error: HttpErrorResponse) => {
            if (error.status === 401 && error.error.error) {
              // return this.notiService.showNoti(
              //   'Thông tin đăng nhập không hợp lệ',
              //   'error'
              // );
            } else if (
              error.status === 0 &&
              error.statusText === 'Unknown Error'
            ) {
              return this.notiService.showNoti(
                'Hệ thống đang bảo trì',
                'error'
              );
            } else if(error.status === 403 && error.error.error) {
              return this.notiService.showNoti(error.error.error.message, 'error');
            } else {
              // return this.notiService.showNoti(
              //   'Hệ thống tạm thời gián đoạn',
              //   'error'
              // );
            }
          }
        )
      );
  }

  getAdditionalHeaders(existingHeaders?: HttpHeaders) {
    const headers = {} as any;

    const token = this.auth.getAccessToken();
    if (!existingHeaders?.has('Authorization') && token) {
      headers['Accept-Language'] = 'vi';
      headers.Authorization = `Bearer ${token}`;
    }

    // const tenant = this.store.selectSnapshot(SessionState.getTenant);
    // if (!existingHeaders?.has('__tenant') && tenant) {
    //   headers.__tenant = tenant.id;
    // }

    return headers;
  }
}
