import { CommonModule } from '@angular/common';
// Angular
import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GestureConfig } from '@angular/material/core';
import { OverlayModule } from '@angular/cdk/overlay';
// Angular in memory
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// Perfect Scroll bar
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from 'ngx-perfect-scrollbar';
// SVG inline
import { InlineSVGModule } from 'ng-inline-svg';
// Env
import { environment } from '../environments/environment';
// Hammer JS
import 'hammerjs';
// NGX Permissions
import { NgxPermissionsModule } from 'ngx-permissions';
// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// State
import { metaReducers, reducers } from './core/reducers';
// Components
import { AppComponent } from './app.component';
// Modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { ThemeModule } from './views/theme/theme.module';
// Partials
import { PartialsModule } from './views/partials/partials.module';
// Layout Services
import {
  DataTableService,
  FakeApiService,
  KtDialogService,
  LayoutConfigService,
  LayoutRefService,
  MenuAsideService,
  MenuConfigService,
  MenuHorizontalService,
  PageConfigService,
  SmasContextService,
  SplashScreenService,
  SubheaderService,
} from './core/_base/layout';
// Auth
import { AuthModule } from './views/pages/auth/auth.module';
import { AuthService } from './core/auth';
// CRUD
import {
  HttpUtilsService,
  LayoutUtilsService,
  TypesUtilsService,
} from './core/_base/crud';
// Config
import { LayoutConfig } from './core/_config/layout.config';
// Highlight JS
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import { GridModule } from '@progress/kendo-angular-grid';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { SearchModule } from './views/pages/officers/search/search.module';
import { ConfigService, TenantService } from './core/auth/_services';
import {ToastrModule} from 'ngx-toastr';
import { EmployeeComponent } from './employee/employee.component';
import { MedicineComponent} from './medicine/medicine.component';
import { LoginComponent } from './login/login.component';
import {ErrorInterceptor, JwtInterceptor} from "./_helpers";
import {fakeBackendProvider} from "./_helpers/fake-backend";
import {ButtonModule} from "@progress/kendo-angular-buttons";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxSpinnerModule} from "ngx-spinner";
import {DropDownListModule} from "@progress/kendo-angular-dropdowns";
import {NgbCollapseModule} from "@ng-bootstrap/ng-bootstrap";
import {EmployeeModule} from "./employee/employee.module";
import {MedicineModule} from './medicine/medicine.module';
import { BillComponent } from './bill/bill.component';


// tslint:disable-next-line:class-name
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelSpeed: 0.5,
  swipeEasing: true,
  minScrollbarLength: 40,
  maxScrollbarLength: 300,
};

export const toastrConfig = {
  positionClass: 'toast-bottom-right',
  maxOpened: 3,
  autoDismiss: true,
  timeOut: 3000,
};


export function initializeLayoutConfig(appConfig: LayoutConfigService) {
  // initialize app by loading default demo layout config
  return () => {
    if (appConfig.getConfig() === null) {
      appConfig.loadConfigs(new LayoutConfig().configs);
    }
  };
}

export function initializeSmasContext(smasContextService: SmasContextService) {
  return () => {
    // if (smasContextService.getSmasConText() === null) {
    //   // TODO: set init
    //   const smas: SmasConText = {
    //     level: '',
    //     year: '2020'
    //   }
    //   smasContextService.saveSmasConText(smas);
    // }
  };
}

/**
 * Import specific languages to avoid importing everything
 * The following will lazy load highlight.js core script (~9.6KB) + the selected languages bundle (each lang. ~1kb)
 */
export function getHighlightLanguages() {
  return [
    { name: 'typescript', func: typescript },
    { name: 'scss', func: scss },
    { name: 'xml', func: xml },
    { name: 'json', func: json },
  ];
}

@NgModule({
  declarations: [AppComponent,MedicineComponent, EmployeeComponent, LoginComponent, BillComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // environment.isMockEnabled
    //   ? HttpClientInMemoryWebApiModule.forRoot(FakeApiService, {
    //       passThruUnknownUrl: true,
    //       dataEncapsulation: false,
    //     })
    //   : [],
    NgxPermissionsModule.forRoot(),
    HighlightModule,
    PartialsModule,
    CoreModule,
    OverlayModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    StoreDevtoolsModule.instrument(),
    AuthModule.forRoot(),
    TranslateModule.forRoot(),
    MatProgressSpinnerModule,
    InlineSVGModule.forRoot(),
    ThemeModule,
    GridModule,
    TreeViewModule,
    NotificationModule,
    InputsModule,
    SearchModule,
    ToastrModule.forRoot(toastrConfig),
    ButtonModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    DropDownListModule,
    NgbCollapseModule,
    EmployeeModule,
    MedicineModule,
    FormsModule,
  ],
  providers: [
    AuthService,
    ConfigService,
    TenantService,
    LayoutConfigService,
    LayoutRefService,
    MenuConfigService,
    PageConfigService,
    KtDialogService,
    DataTableService,
    SplashScreenService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: GestureConfig,
    },
    {
      // layout config initializer
      provide: APP_INITIALIZER,
      useFactory: initializeLayoutConfig,
      deps: [LayoutConfigService],
      multi: true,
    },
    SmasContextService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeSmasContext,
      deps: [SmasContextService],
      multi: true,
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        languages: getHighlightLanguages,
      },
    },
    SubheaderService,
    MenuHorizontalService,
    MenuAsideService,
    HttpUtilsService,
    TypesUtilsService,
    LayoutUtilsService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    fakeBackendProvider
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
