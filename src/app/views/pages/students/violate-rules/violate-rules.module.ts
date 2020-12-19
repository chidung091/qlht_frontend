import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViolateRulesComponent} from "./violate-rules.component";
import {RouterModule, Routes} from "@angular/router";
import { AddNewViolateRulesComponent } from './add-new-violate-rules/add-new-violate-rules.component';
import { SearchBoxViolateComponent } from './search-box-violate/search-box-violate.component';
import {PortletModule} from "../../../partials/content/general/portlet/portlet.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LabelModule} from "@progress/kendo-angular-label";
import {ButtonGroupModule, ButtonModule, DropDownButtonModule} from "@progress/kendo-angular-buttons";
import {DropDownListModule} from "@progress/kendo-angular-dropdowns";
import {DatePickerModule} from "@progress/kendo-angular-dateinputs";
import {FormFieldModule} from "@progress/kendo-angular-inputs";
import {BodyModule, GridModule, SharedModule} from "@progress/kendo-angular-grid";
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";

const routes: Routes = [
  {
    path:'',
    component: ViolateRulesComponent
  },
  {
    path:'add-new-violate-rules',
    component:AddNewViolateRulesComponent,
  }
]

@NgModule({
  declarations: [
    ViolateRulesComponent,
    AddNewViolateRulesComponent,
    SearchBoxViolateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PortletModule,
    ReactiveFormsModule,
    LabelModule,
    DropDownButtonModule,
    DropDownListModule,
    ButtonGroupModule,
    ButtonModule,
    DatePickerModule,
    FormFieldModule,
    GridModule,
    SharedModule,
    BodyModule,
    FormsModule,
    NgbTooltipModule
  ]
})
export class ViolateRulesModule {
}
