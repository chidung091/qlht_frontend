// NGRX
import { Action } from '@ngrx/store';

export enum UploadFileActionTypes {
  UploadFileRequested = '[File Upload Form] Requested',
  UploadFileCancel = '[File Upload Form] Cancel',
  UploadFileReset = '[File Upload Form] Reset',
  UploadFileStarted = '[File Upload API] Started',
  UploadFileProgress = '[File Upload API] Progress',
  UploadFileFailure = '[File Upload API] Failure',
  UploadFileCompleted = '[File Upload API] Completed',
}

export class UploadFileRequested implements Action {
  readonly type = UploadFileActionTypes.UploadFileRequested;
  constructor(public payload: { file: File }) {}
}

export class UploadFileCancel implements Action {
  readonly type = UploadFileActionTypes.UploadFileCancel;
}

export class UploadFileReset implements Action {
  readonly type = UploadFileActionTypes.UploadFileReset;
}

export class UploadFileStarted implements Action {
  readonly type = UploadFileActionTypes.UploadFileStarted;
}

export class UploadFileProgress implements Action {
  readonly type = UploadFileActionTypes.UploadFileProgress;
  constructor(public payload: { progress: number }) {}
}

export class UploadFileFailure implements Action {
  readonly type = UploadFileActionTypes.UploadFileFailure;
  constructor(public payload: { error: string }) {}
}

export class UploadFileCompleted implements Action {
  readonly type = UploadFileActionTypes.UploadFileCompleted;
}

export type UploadFileActions =
    UploadFileRequested
    | UploadFileCancel
    | UploadFileReset
    | UploadFileStarted
    | UploadFileProgress
    | UploadFileFailure
    | UploadFileCompleted;
