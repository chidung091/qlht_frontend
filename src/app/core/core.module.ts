// Anglar
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Layout Directives
// Services
import {
  ContentAnimateDirective,
  FirstLetterPipe,
  GetObjectPipe,
  HeaderDirective,
  JoinPipe,
  MenuDirective,
  OffcanvasDirective,
  SafePipe,
  ScrollTopDirective,
  SparklineChartDirective,
  StickyDirective,
  TabClickEventDirective,
  TimeElapsedPipe,
  ToggleDirective,
  TrimDirective, TrimFormDirective,
} from './_base/layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TrimStringPipe } from './_base/layout/pipes/trim-string.pipe';
import { OAuthModule } from 'angular-oauth2-oidc';
import { OAuthConfigurationHandler } from './_base/crud/utils/oauth-configuration.handler';
import { InterceptService } from './_base/crud';
import {CommonStore} from './common';
import {SmasTrimDirective} from './_base/layout/directives/smas-trim.directive';

@NgModule({
  imports: [CommonModule,
      OAuthModule.forRoot(),
      HttpClientModule,
  ],
  declarations: [
    // directives
    ScrollTopDirective,
    HeaderDirective,
    OffcanvasDirective,
    ToggleDirective,
    MenuDirective,
    TabClickEventDirective,
    SparklineChartDirective,
    ContentAnimateDirective,
    StickyDirective,
    TrimDirective,
    TrimFormDirective,
    SmasTrimDirective,

    CommonStore,
    // pipes
    TimeElapsedPipe,
    JoinPipe,
    GetObjectPipe,
    SafePipe,
    FirstLetterPipe,
    TrimStringPipe,
  ],
  exports: [
    // directives
    ScrollTopDirective,
    HeaderDirective,
    OffcanvasDirective,
    ToggleDirective,
    MenuDirective,
    TabClickEventDirective,
    SparklineChartDirective,
    ContentAnimateDirective,
    StickyDirective,
    TrimDirective,
    TrimFormDirective,
    SmasTrimDirective,

    CommonStore,
    // pipes
    TimeElapsedPipe,
    JoinPipe,
    GetObjectPipe,
    SafePipe,
    FirstLetterPipe,
    TrimStringPipe,
  ],
  providers: [
    InterceptService,
		// {
		// 	provide: HTTP_INTERCEPTORS,
		// 	useClass: InterceptService,
		// 	multi: true
		// },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [OAuthConfigurationHandler],
      // tslint:disable-next-line: only-arrow-functions
      useFactory: () => {return function() {}},
    },
  ],
})
export class CoreModule {}
