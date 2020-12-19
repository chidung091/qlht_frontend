import { NgModule } from '@angular/core';
// import { PermissionDirective } from './directives/permission.directive';
import { CommonModule } from '@angular/common';
import { PermissionDirective } from './directives/permission.directive';
import { NgUnsubscribe } from './directives/ng-unsubscribe.directive';
import { TooltipModule } from '@progress/kendo-angular-tooltip';

@NgModule({
  imports: [
    CommonModule,
    TooltipModule
  ],
  declarations: [
    PermissionDirective,
    NgUnsubscribe
  ],
  exports: [
    PermissionDirective,
    NgUnsubscribe
  ],
})
export class SharedModule {}
