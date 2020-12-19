import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectUploadFileCompleted,
  selectUploadFileError,
  selectUploadFileFailed,
  selectUploadFileInProgress,
  selectUploadFileProgress,
  selectUploadFileReady,
  UploadFileCancel,
  UploadFileRequested,
  UploadFileReset,
} from '../../core/upload-file';
import { AppState } from '../../core/reducers';

@Component({
  selector: 'kt-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  completed$: Observable<boolean>;
  progress$: Observable<number>;
  error$: Observable<string>;
  isInProgress$: Observable<boolean>;
  isReady$: Observable<boolean>;
  hasFailed$: Observable<boolean>;

  constructor(private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.completed$ = this.store$.pipe(select(selectUploadFileCompleted));

    this.progress$ = this.store$.pipe(select(selectUploadFileProgress));

    this.error$ = this.store$.pipe(select(selectUploadFileError));

    this.isInProgress$ = this.store$.pipe(select(selectUploadFileInProgress));

    this.isReady$ = this.store$.pipe(select(selectUploadFileReady));

    this.hasFailed$ = this.store$.pipe(select(selectUploadFileFailed));
  }

  uploadFile(event: any) {
    const files: FileList = event.target.files;
    const file = files.item(0);

    this.store$.dispatch(
      new UploadFileRequested({
        file
      })
    );

    event.srcElement.value = null;
  }

  resetUpload() {
    this.store$.dispatch(new UploadFileReset());
  }

  cancelUpload() {
    this.store$.dispatch(new UploadFileCancel());
  }

  // uploadedData: any;
  // onChange(event) {
  //   const reader = new FileReader();
  //   reader.onload = e => {
  //     const raw = (<FileReader>e.target).result as string;
  //     const res = JSON.parse(raw);
  //     this.uploadedData = res;
  //   }
  //   reader.readAsText(event.target.files[0]);
  // }
}
