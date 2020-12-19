import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalAddEditHeadTeacherSubstitutionsComponent} from "./list-head-teacher-substituons/modal-add-edit-head-teacher-substitutions/modal-add-edit-head-teacher-substitutions.component";
import {HeadTeacherAssignmentComponent} from "./head-teacher-assignment.component";
import {ListHeadTeacherSubstituonsComponent} from "./list-head-teacher-substituons/list-head-teacher-substituons.component";
import {ListHeadTeacherAssignmentComponent} from "./list-head-teacher-assignment/list-head-teacher-assignment.component";
import {ButtonModule} from "@progress/kendo-angular-buttons";
import {BodyModule, GridModule, PagerModule, SharedModule} from "@progress/kendo-angular-grid";
import {AutoCompleteModule, DropDownListModule} from "@progress/kendo-angular-dropdowns";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DialogModule} from "@progress/kendo-angular-dialog";
import {DatePickerModule, DateTimePickerModule} from "@progress/kendo-angular-dateinputs";
import {FormFieldModule} from "@progress/kendo-angular-inputs";
import { ModalDeleteHeadTeacherAssignmentComponent } from './modal-delete-head-teacher-assignment/modal-delete-head-teacher-assignment.component';
import {RouterModule, Routes} from "@angular/router";
import {PartialsModule} from "../../../partials/partials.module";
import {NgbCollapseModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";



const HeadTeacherAssignmentRecordRoutes: Routes = [
  {
    path: '',
    component: HeadTeacherAssignmentComponent,
    children: [
      {
        path: 'assignment',
        component: ListHeadTeacherAssignmentComponent
      },
      {
        path: 'substitute',
        component: ListHeadTeacherSubstituonsComponent
      },
      {
        path: '', redirectTo: 'assignment', pathMatch: 'full'
      },
    ]
  },
];
@NgModule({
  declarations: [
    ListHeadTeacherAssignmentComponent,
    ListHeadTeacherSubstituonsComponent,
    ModalAddEditHeadTeacherSubstitutionsComponent,
    ModalDeleteHeadTeacherAssignmentComponent
  ],
  imports: [
    CommonModule,
    GridModule,
    DropDownListModule,
    ButtonModule,
    FormsModule,
    DialogModule,
    FormFieldModule,
    ReactiveFormsModule,
    DatePickerModule,
    DateTimePickerModule,
    AutoCompleteModule,
    BodyModule,
    SharedModule,
    PagerModule,
    [RouterModule.forChild(HeadTeacherAssignmentRecordRoutes)],
    PartialsModule,
    NgbCollapseModule,
    NgbModule
  ],
  entryComponents:[
    ModalAddEditHeadTeacherSubstitutionsComponent,
    ModalDeleteHeadTeacherAssignmentComponent
  ]
})
export class HeadTeacherAssignmentModule { }
