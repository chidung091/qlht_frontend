// Angular
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// Material
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// Translate
import { TranslateModule } from '@ngx-translate/core';
// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// CRUD
import { InterceptService } from '../../../core/_base/crud/';
// Module components
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthNoticeComponent } from './auth-notice/auth-notice.component';
// Auth
import { AuthEffects, AuthGuard, authReducer, AuthService, ConfigEffects, configReducer, RoleGuard, TenantEffects, tenantReducer } from '../../../core/auth';
import {DropDownsModule} from '@progress/kendo-angular-dropdowns';
import {NotificationModule} from '@progress/kendo-angular-notification';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PermissionGuard } from '../../../core/auth/_guards/permission.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PartialsModule } from '../../partials/partials.module';
import { LabelModule } from '@progress/kendo-angular-label';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseComponent } from '../../theme/base/base.component';

const routes: Routes = [
	{
		path: '',
		component: AuthComponent,
		children: [
			{
				path: '',
				redirectTo: 'login',
				pathMatch: 'full'
			},
			{
				path: 'login',
				component: LoginComponent,
				data: {returnUrl: window.location.pathname}
			},
			{
				path: 'forgot-password',
				component: ForgotPasswordComponent,
      },
      {
        path: '',
        component: BaseComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'change-password',
            component: ChangePasswordComponent,
          },
          { path: '', redirectTo: 'change-password', pathMatch: 'full' },
        ],
      },
		]
	}
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
	MatButtonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    TranslateModule.forChild(),
    StoreModule.forFeature('auth', authReducer),
	EffectsModule.forFeature([AuthEffects]),
	StoreModule.forFeature('config', configReducer),
	EffectsModule.forFeature([ConfigEffects]),
	StoreModule.forFeature('tenant', tenantReducer),
    EffectsModule.forFeature([TenantEffects]),
    DropDownsModule,
	NotificationModule,
  NgxSpinnerModule,
  PartialsModule,
  LabelModule,
  InputsModule,
  NgbModule,
  ],
	providers: [
		InterceptService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptService,
			multi: true
		}
	],
    exports: [AuthComponent, AuthNoticeComponent],
	declarations: [
		AuthComponent,
		LoginComponent,
		ForgotPasswordComponent,
		AuthNoticeComponent,
		ChangePasswordComponent
	]
})

export class AuthModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: AuthModule,
			providers: [
				AuthService,
				AuthGuard,
				PermissionGuard,
				RoleGuard
			]
		};
	}
}
