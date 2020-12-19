import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmulationCriteriaComponent} from './emulation-criteria.component';
import {SearchModule} from "../search/search.module";
import {ActionEmulationCriteriaComponent} from "./action-emulation-criteria/action-emulation-criteria.component";
import {DialogsModule} from "@progress/kendo-angular-dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputsModule} from "@progress/kendo-angular-inputs";
import {ButtonModule} from "@progress/kendo-angular-buttons";
import {BodyModule, GridModule, PagerModule} from "@progress/kendo-angular-grid";
import {DropDownsModule} from "@progress/kendo-angular-dropdowns";
import {PortletModule} from "../../../partials/content/general/portlet/portlet.module";
import {SharedModule} from "../../../shared/shared.module";
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {CoreModule} from "../../../../core/core.module";



@NgModule({
  declarations: [
    EmulationCriteriaComponent,
    ActionEmulationCriteriaComponent
  ],
    imports: [
        CommonModule,
        SearchModule,
        DialogsModule,
        ReactiveFormsModule,
        InputsModule,
        ButtonModule,
        GridModule,
        BodyModule,
        PagerModule,
        DropDownsModule,
        FormsModule,
        PortletModule,
        SharedModule,
        NgbTooltipModule,
        CoreModule
    ]
})
export class EmulationCriteriaModule { }
