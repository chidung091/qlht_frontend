import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PraiseDisciplineComponent} from './praise-discipline.component';
import {RouterModule, Routes} from '@angular/router';
import { PraiseComponent } from './praise/praise.component';
import { DisciplineComponent } from './discipline/discipline.component';
import {ViolationModule} from '../violation/violation.module';
import { ActionPraiseComponent } from './praise/action-praise/action-praise.component';
import {DialogModule} from '@progress/kendo-angular-dialog';
import {BodyModule, GridModule} from '@progress/kendo-angular-grid';
import {DropDownListModule} from '@progress/kendo-angular-dropdowns';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ActionDisciplineComponent } from './discipline/action-discipline/action-discipline.component';
import {FormFieldModule, TextBoxModule} from '@progress/kendo-angular-inputs';
import {ButtonModule} from '@progress/kendo-angular-buttons';
import {SearchModule} from '../search/search.module';
import {LayoutModule} from '@progress/kendo-angular-layout';
import {PortletModule} from "../../../partials/content/general/portlet/portlet.module";
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {SharedModule} from "../../../shared/shared.module";
import {CoreModule} from "../../../../core/core.module";

const routes: Routes = [
  {
    path: '',
    component: PraiseDisciplineComponent,
  },
  {
    path: 'discipline',
    component: PraiseDisciplineComponent,
  },
]

@NgModule({
  declarations: [
    PraiseComponent,
    DisciplineComponent,
    ActionPraiseComponent,
    ActionDisciplineComponent,
    PraiseDisciplineComponent,
  ],
  exports: [
    DisciplineComponent,
    PraiseComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ViolationModule,
    DialogModule,
    GridModule,
    BodyModule,
    SharedModule,
    DropDownListModule,
    FormsModule,
    ReactiveFormsModule,
    FormFieldModule,
    ButtonModule,
    SearchModule,
    LayoutModule,
    PortletModule,
    NgbTooltipModule,
    SharedModule,
    CoreModule,
    TextBoxModule,
  ]
})
export class PraiseDisciplineModule { }
