import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExpWorkComponent} from './exp-work.component';
import {ActionExpWorkComponent} from './action-exp-work/action-exp-work.component';
import {SearchModule} from "../search/search.module";
import {BodyModule, GridModule} from "@progress/kendo-angular-grid";
import {DialogsModule} from "@progress/kendo-angular-dialog";
import {InputsModule} from "@progress/kendo-angular-inputs";
import {PortletModule} from "../../../partials/content/general/portlet/portlet.module";



@NgModule({
  declarations: [
    ExpWorkComponent,
    ActionExpWorkComponent
  ],
    imports: [
        CommonModule,
        SearchModule,
        GridModule,
        BodyModule,
        DialogsModule,
        InputsModule,
        PortletModule
    ]
})
export class ExpWorkModule { }
