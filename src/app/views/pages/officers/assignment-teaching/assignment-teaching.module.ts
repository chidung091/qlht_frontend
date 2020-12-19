import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AssignmentActionComponent} from './assignment/assignment-action/assignment-action.component';
import {PortletModule} from '../../../partials/content/general/portlet/portlet.module';
import {ButtonModule} from '@progress/kendo-angular-buttons';
import {AssignmentTeachingComponent} from './assignment-teaching.component';
import {AssignmentComponent} from './assignment/assignment.component';
import {AccordingTeacherComponent} from './according-teacher/according-teacher.component';
import {AssignmentListComponent} from './assignment/assignment-list/assignment-list.component';
import {AccordingTeacherListComponent} from './according-teacher/according-teacher-list/according-teacher-list.component';
import {NgbNavModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {TreeViewModule} from '@progress/kendo-angular-treeview';
import {BodyModule, GridModule, PagerModule, RowFilterModule} from '@progress/kendo-angular-grid';
import {ComboBoxModule} from '@progress/kendo-angular-dropdowns';
import {CoreModule} from '../../../../core/core.module';

@NgModule({
  declarations: [
    AssignmentTeachingComponent,
    AssignmentComponent,
    AccordingTeacherComponent,
    AssignmentListComponent,
    AccordingTeacherListComponent,
    AssignmentActionComponent,
  ],
  imports: [
    CommonModule,
    PortletModule,
    ButtonModule,
    NgbNavModule,
    TreeViewModule,
    GridModule,
    BodyModule,
    RowFilterModule,
    PagerModule,
    NgbTooltipModule,
    ComboBoxModule,
    CoreModule
  ],
  entryComponents: [
    AssignmentActionComponent
  ],
  exports: [
  ]
})
export class AssignmentTeachingModule { }
