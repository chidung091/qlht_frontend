// NGRX
import { createSelector } from '@ngrx/store';
import { UploadStatus } from '..';

export const selectUploadFileState = (state) => state.uploadFile;

export const selectUploadFileError = createSelector(
  selectUploadFileState,
  (state) => state.error
);

export const selectUploadFileReady = createSelector(
  selectUploadFileState,
  (state) => state.status === UploadStatus.Ready
);

export const selectUploadFileRequested = createSelector(
  selectUploadFileState,
  (state) => state.status === UploadStatus.Requested
);

export const selectUploadFileStarted = createSelector(
  selectUploadFileState,
  (state) => state.status === UploadStatus.Started
);

export const selectUploadFileProgress = createSelector(
  selectUploadFileState,
  (state) => state.progress
);

export const selectUploadFileInProgress = createSelector(
  selectUploadFileState,
  (state) => state.status === UploadStatus.Started && state.progress >= 0
);

export const selectUploadFileFailed = createSelector(
  selectUploadFileState,
  (state) => state.status === UploadStatus.Failed
);

export const selectUploadFileCompleted = createSelector(
  selectUploadFileState,
  (state) => state.status === UploadStatus.Completed
);
