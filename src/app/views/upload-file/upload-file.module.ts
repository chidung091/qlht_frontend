import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UploadFileEffects, uploadFileReducer, UploadFileService } from '../../core/upload-file';
import { UploadFileComponent } from './upload-file.component';



@NgModule({
  declarations: [UploadFileComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('uploadFile', uploadFileReducer),
    EffectsModule.forFeature([UploadFileEffects])
  ],
  providers: [UploadFileService],
  exports: [
    UploadFileComponent
  ]
})
export class UploadFileModule { }
