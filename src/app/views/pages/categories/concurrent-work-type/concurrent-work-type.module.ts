import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionConcurrentWorkTypeComponent } from './action-concurrent-work-type/action-concurrent-work-type.component';
import {DialogModule} from '@progress/kendo-angular-dialog';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormFieldModule, TextBoxModule} from "@progress/kendo-angular-inputs";
import {ConcurrentWorkTypeComponent} from "./concurrent-work-type.component";
import {SearchModule} from "../search/search.module";
import {PartialsModule} from "../../../partials/partials.module";
import {BodyModule, GridModule, PagerModule} from "@progress/kendo-angular-grid";
import {DropDownsModule} from "@progress/kendo-angular-dropdowns";
import {ButtonsModule} from "@progress/kendo-angular-buttons";
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {SharedModule} from "../../../shared/shared.module";
import {CoreModule} from "../../../../core/core.module";
import {NgxsModule} from "@ngxs/store";
import {SchoolInformationState} from "../../../../core/service/states/school-information-state";
import {ClassroomState} from "../../../../core/service/states/classroom.state";
import {CatalogState} from "../../../../core/service/states/catalog.state";



@NgModule({
    declarations: [
      ActionConcurrentWorkTypeComponent,
      ConcurrentWorkTypeComponent],
    exports: [
        ActionConcurrentWorkTypeComponent
    ],
    imports: [
        CommonModule,
        DialogModule,
        ReactiveFormsModule,
        FormFieldModule,
        SearchModule,
        PartialsModule,
        GridModule,
        BodyModule,
        PagerModule,
        DropDownsModule,
        FormsModule,
        ButtonsModule,
        NgbTooltipModule,
        SharedModule,
        CoreModule,
        TextBoxModule,
    ]
})
export class ConcurrentWorkTypeModule { }
