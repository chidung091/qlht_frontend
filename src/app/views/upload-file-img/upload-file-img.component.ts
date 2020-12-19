import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { finalize } from 'rxjs/operators';
import { NotiService } from 'src/app/core/service/service-model/notification.service';
import { UploadFile } from './upload-flie.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/reducers';
import {TenantReLoad} from '../../core/auth';
import {Observable} from 'rxjs';

@Component({
  selector: 'kt-upload-file-img',
  templateUrl: './upload-file-img.component.html',
  styleUrls: ['./upload-file-img.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadFileImgComponent implements OnInit {

  imgsrc = '../../assets/media/users/default.jpg';
  @Input() dataInitialization: Observable<string>;
  isLoadingImg: boolean = false;

  constructor(
    public domFile: DomSanitizer,
    private uploadFileSChool: UploadFile,
    private notiService: NotiService,
    private cdfRef: ChangeDetectorRef,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.imgsrc = '../../assets/media/users/default.jpg';
    this.dataInitialization.subscribe(value => {
      if (value) {
        this.imgsrc = value;
        this.cdfRef.detectChanges()
      }
    })
  }

  fileChange(e) {
    const file = e.srcElement.files[0];
    const extFileAccept = ['bmp', 'dib', 'png', 'jfif', 'pjpeg', 'jpeg', 'pjp', 'jpg', 'gif'];
    const ext = file.name.substring(file.name.lastIndexOf('.') + 1);

    if (!extFileAccept.includes(ext)){
      this.notiService.showNoti('File ảnh không đúng định dạng', 'error');
      return;
    }

    this.imgsrc = window.URL.createObjectURL(file);

    const formData = new FormData();
    formData.append('TenantId', '');
    formData.append('Image', file);

    this.isLoadingImg = true;
    this.uploadFileSChool.UploadFileSChool(formData)
      .pipe(finalize(()=>{
      this.isLoadingImg = false;
    })).subscribe(res=>{
      this.isLoadingImg = false;
      this.cdfRef.markForCheck()
      this.store.dispatch(new TenantReLoad());
      this.notiService.updateSuccess();
    },()=>{
      this.isLoadingImg = false;
      this.cdfRef.markForCheck()
    })
  }
}
