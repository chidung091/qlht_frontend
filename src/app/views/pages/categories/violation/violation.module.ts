import {NgModule} from '@angular/core';
import {ViolationComponent} from './violation.component';
import {SearchComponent} from '../search/search.component';
import {CommonModule} from '@angular/common';
import {DropDownsModule} from '@progress/kendo-angular-dropdowns';
import {FormsModule} from '@angular/forms';
import {BodyModule, GridModule, PagerModule} from '@progress/kendo-angular-grid';
import {DialogsModule} from '@progress/kendo-angular-dialog';
import { ActionViolationComponent } from './action-violation/action-violation.component';
import {PortletModule} from "../../../partials/content/general/portlet/portlet.module";
import {SearchModule} from "../search/search.module";

@NgModule({
  declarations: [
    ViolationComponent,
    ActionViolationComponent,
  ],
  exports: [
  ],
  imports: [
      CommonModule,
      DropDownsModule,
      FormsModule,
      GridModule,
      BodyModule,
      DialogsModule,
      PagerModule,
      PortletModule,
      SearchModule
  ]
})
export class ViolationModule{}
