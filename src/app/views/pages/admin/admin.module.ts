import { NgModule } from '@angular/core';
import { UserManagementModule } from './user-management/user-management.module';
import { TenantManagementModule } from './tenant-management/tenant-management.module';
import { CoreModule } from '../../../core/core.module';
import {
  usersReducer,
  UserEffects
} from '../../../core/auth';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { InterceptService } from 'src/app/core/_base/crud';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('users', usersReducer),
    EffectsModule.forFeature([UserEffects]),
    CoreModule,
    HttpClientModule,
    UserManagementModule,
    TenantManagementModule,
    DialogModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    },

  ],
})
export class AdminModule { }
