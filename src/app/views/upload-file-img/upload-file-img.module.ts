import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFileImgComponent } from './upload-file-img.component';
import {StoreModule} from '@ngrx/store';
import {TenantEffects, tenantReducer} from '../../core/auth';
import {EffectsModule} from '@ngrx/effects';



@NgModule({
  declarations: [UploadFileImgComponent],
  imports: [
    StoreModule.forFeature('tenant', tenantReducer),
    EffectsModule.forFeature([TenantEffects]),
    CommonModule
  ],
  exports: [
    UploadFileImgComponent
  ]
})
export class UploadFileImgModule { }
