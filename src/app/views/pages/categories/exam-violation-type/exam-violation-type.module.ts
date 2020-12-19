import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExamViolationTypeComponent} from './exam-violation-type.component';
import {BodyModule, GridModule, PagerModule,} from '@progress/kendo-angular-grid';
import {DropDownsModule} from '@progress/kendo-angular-dropdowns';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActionExamViolationTypeComponent} from './action-exam-violation-type/action-exam-violation-type.component';
import {SearchModule} from '../search/search.module';
import {ButtonsModule} from '@progress/kendo-angular-buttons';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DialogsModule} from '@progress/kendo-angular-dialog';
import {InputsModule} from '@progress/kendo-angular-inputs';
import {PortletModule} from '../../../partials/content/general/portlet/portlet.module';
import {SharedModule} from '../../../shared/shared.module';



@NgModule({
  declarations: [
    ExamViolationTypeComponent,
    ActionExamViolationTypeComponent,

  ],
  imports: [
    CommonModule,
    PagerModule,
    DropDownsModule,
    FormsModule,
    BodyModule,
    GridModule,
    SearchModule,
    ButtonsModule,
    NgbModule,
    DialogsModule,
    InputsModule,
    ReactiveFormsModule,
    PortletModule,
    SharedModule,
  ]
})
export class ExamViolationTypeModule { }
