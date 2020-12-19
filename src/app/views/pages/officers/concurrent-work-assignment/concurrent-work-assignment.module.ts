import {RouterModule, Routes} from '@angular/router';
import {ConcurrentWorkComponent} from './concurrent-work/concurrent-work.component';
import {ConcurrentWorkAssignmentComponent} from './concurrent-work-assignment.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { InsteadWorkComponent } from './instead-work/instead-work.component';
import {BodyModule, GridModule, PagerModule} from '@progress/kendo-angular-grid';
import {AutoCompleteModule, DropDownListModule} from '@progress/kendo-angular-dropdowns';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from '@progress/kendo-angular-buttons';
import { AddConcurrentWorkComponent } from './concurrent-work/add-concurrent-work/add-concurrent-work.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AddSubstituteWorkComponent } from './instead-work/add-substitute-work/add-substitute-work.component';
import {IntlModule} from "@progress/kendo-angular-intl";
import {DatePickerModule} from "@progress/kendo-angular-dateinputs";
import {DialogModule} from "@progress/kendo-angular-dialog";
import {NgbCollapseModule, NgbNavModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {PopupModule} from "@progress/kendo-angular-popup";
import {NgxsModule} from "@ngxs/store";
import {ConcurrentWorkAssigmentState} from "../../../../core/service/states/concurrent-work-assigment.state";
import {PortletModule} from "../../../partials/content/general/portlet/portlet.module";
import {FormFieldModule} from "@progress/kendo-angular-inputs";
import {SharedModule} from "../../../shared/shared.module";

const ConcurrentWorkAssignmentRoutes: Routes = [ {
  path: 'concurrent-work-assignment',
  component: ConcurrentWorkAssignmentComponent,
  children: [
    {
      path: 'concurrent-work',
      component: ConcurrentWorkComponent
    },
    {
      path: 'instead-work',
      component: InsteadWorkComponent
    },
    {
      path: '', redirectTo: 'concurrent-work', pathMatch: 'full'
    },
  ]
}]
@NgModule({
  declarations: [
    ConcurrentWorkComponent,
    InsteadWorkComponent,
    AddConcurrentWorkComponent,
    AddSubstituteWorkComponent,
    ConcurrentWorkAssignmentComponent,
  ],
    imports: [
        CommonModule,
        [RouterModule.forChild(ConcurrentWorkAssignmentRoutes)],
        GridModule,
        PagerModule,
        DropDownListModule,
        SharedModule,
        FormsModule,
        BodyModule,
        ButtonModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        IntlModule,
        DatePickerModule,
        DialogModule,
        NgbNavModule,
        ReactiveFormsModule,
        PopupModule,
        PortletModule,
        AutoCompleteModule,
        NgbTooltipModule,
        FormFieldModule,
        SharedModule,
        NgbCollapseModule,
    ],
  entryComponents: [
    AddConcurrentWorkComponent,
    AddSubstituteWorkComponent,
    ConcurrentWorkComponent,
    InsteadWorkComponent
  ]
})export class   ConcurrentWorkAssignmentModule {
}
