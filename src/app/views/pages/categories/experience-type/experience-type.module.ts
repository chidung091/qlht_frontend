import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExperienceTypeComponent} from './experience-type.component';
import {BodyModule, GridModule, PagerModule} from "@progress/kendo-angular-grid";
import {DropDownsModule} from "@progress/kendo-angular-dropdowns";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DialogsModule} from "@progress/kendo-angular-dialog";
import {SearchModule} from "../search/search.module";
import {ActionExperienceTypeComponent} from "./action-experience-type/action-experience-type.component";
import {ButtonsModule} from "@progress/kendo-angular-buttons";
import {InputsModule} from "@progress/kendo-angular-inputs";
import {PortletModule} from "../../../partials/content/general/portlet/portlet.module";
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {SharedModule} from "../../../shared/shared.module";
import {CoreModule} from "../../../../core/core.module";



@NgModule({
  declarations: [
    ExperienceTypeComponent,
    ActionExperienceTypeComponent,
  ],
    imports: [
        CommonModule,
        GridModule,
        BodyModule,
        PagerModule,
        DropDownsModule,
        FormsModule,
        DialogsModule,
        SearchModule,
        ButtonsModule,
        InputsModule,
        ReactiveFormsModule,
        PortletModule,
        NgbTooltipModule,
        SharedModule,
        CoreModule
    ]
})
export class ExperienceTypeModule { }
