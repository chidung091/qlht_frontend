// Angular
import { Injectable } from '@angular/core';
// RxJS
import {
  map,
  concatMap,
  catchError,
  takeUntil,
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
// NGRX
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { UploadFileRequested, UploadFileService } from '..';
import {
  UploadFileActionTypes,
  UploadFileCancel,
  UploadFileCompleted,
  UploadFileFailure,
  UploadFileProgress,
  UploadFileStarted,
} from '../_actions/upload-file.actions';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { serializeError } from 'serialize-error';

@Injectable()
export class UploadFileEffects {
  @Effect()
  uploadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<UploadFileRequested>(UploadFileActionTypes.UploadFileRequested),
    concatMap((action) =>
      this.upload.uploadFile(action.payload.file).pipe(
        takeUntil(
          this.actions$.pipe(
            ofType<UploadFileCancel>(UploadFileActionTypes.UploadFileCancel)
          )
        ),
        map((event) => this.getActionFromHttpEvent(event)),
        catchError((error) => of(this.handleError(error)))
      )
    )
  );

  constructor(private actions$: Actions, private upload: UploadFileService) {}

  private getActionFromHttpEvent(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.Sent: {
        return new UploadFileStarted();
      }
      case HttpEventType.UploadProgress: {
        return new UploadFileProgress({
          progress: Math.round((100 * event.loaded) / event.total),
        });
      }
      case HttpEventType.ResponseHeader:
      case HttpEventType.Response: {
        if (event.status === 200) {
          return new UploadFileCompleted();
        } else {
          return new UploadFileFailure({
            error: event.statusText,
          });
        }
      }
      default: {
        return new UploadFileFailure({
          error: `Unknown Event: ${JSON.stringify(event)}`,
        });
      }
    }
  }

  private handleError(error: any) {
    debugger
    const friendlyErrorMessage = serializeError(error).message;
    return new UploadFileFailure({
      error: friendlyErrorMessage,
    });
  }
}
