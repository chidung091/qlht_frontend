import {
  UploadFileActions,
  UploadFileActionTypes,
} from '../_actions/upload-file.actions';

export enum UploadStatus {
  Ready = 'Ready',
  Requested = 'Requested',
  Started = 'Started',
  Failed = 'Failed',
  Completed = 'Completed',
}

export interface UploadFileState {
  status: UploadStatus;
  error: string | null;
  progress: number;
}

export const initialUploadFileState: UploadFileState = {
  status: UploadStatus.Ready,
  error: null,
  progress: 0,
};

export function uploadFileReducer(
  state = initialUploadFileState,
  action: UploadFileActions
): UploadFileState {
  switch (action.type) {
    case UploadFileActionTypes.UploadFileRequested: {
      return {
        ...state,
        status: UploadStatus.Requested,
        progress: null,
        error: null,
      };
    }
    case UploadFileActionTypes.UploadFileCancel: {
      return {
        ...state,
        status: UploadStatus.Ready,
        progress: null,
        error: null,
      };
    }
    case UploadFileActionTypes.UploadFileReset: {
      return {
        ...state,
        status: UploadStatus.Ready,
        progress: null,
        error: null,
      };
    }
    case UploadFileActionTypes.UploadFileFailure: {
      return {
        ...state,
        status: UploadStatus.Failed,
        error: action.payload.error,
        progress: null,
      };
    }
    case UploadFileActionTypes.UploadFileStarted: {
      return {
        ...state,
        status: UploadStatus.Started,
        progress: 0,
      };
    }
    case UploadFileActionTypes.UploadFileProgress: {
      return {
        ...state,
        progress: action.payload.progress,
      };
    }
    case UploadFileActionTypes.UploadFileCompleted: {
      return {
        ...state,
        status: UploadStatus.Completed,
        progress: 100,
        error: null,
      };
    }
    default: {
      return state;
    }
  }
}
