import {RouterModule, Routes} from '@angular/router';
import {TeacherGradingComponent} from './teacher-grading.component';
import {GradingComponent} from './grading/grading.component';
import {NgModule} from '@angular/core';
import {JobGradingComponent} from './job-grading/job-grading.component';
import {CommonModule} from '@angular/common';
import {DropDownListModule} from '@progress/kendo-angular-dropdowns';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {BodyModule, ExcelModule, GridModule, PagerModule, SharedModule} from '@progress/kendo-angular-grid';
import {DialogModule} from '@progress/kendo-angular-dialog';
import {ButtonModule} from '@progress/kendo-angular-buttons';
import {NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import {ConfigurationGradingComponent} from './configuration-grading/configuration-grading.component';
import {CheckBoxModule} from '@progress/kendo-angular-treeview';
import {PortletModule} from '../../../partials/content/general/portlet/portlet.module';
import {ClassRoomModule} from '../../system/class-room/class-room.module';

const TeacherGradingRoutes: Routes = [
  {
    path: 'teacher-grading',
    component: TeacherGradingComponent,
    children: [
      {
        path: 'grading',
        component: GradingComponent
      },
      {
        path: 'job-grading',
        component: JobGradingComponent
      },
      {
        path: '', redirectTo: 'grading', pathMatch: 'full'
      }
    ]
  }
]

@NgModule({
  declarations: [
    GradingComponent,
    JobGradingComponent,
    TeacherGradingComponent,
    ConfigurationGradingComponent,
  ], imports: [
    CommonModule,
    [RouterModule.forChild(TeacherGradingRoutes)],
    GridModule,
    SharedModule,
    DropDownListModule,
    BodyModule,
    FormsModule,
    ButtonModule,
    NgbNavModule,
    ReactiveFormsModule,
    MatIconModule,
    ExcelModule,
    DialogModule,
    CheckBoxModule,
    PortletModule,
    ClassRoomModule,
    PagerModule,
    SharedModule,
    SharedModule,
    SharedModule,
  ], entryComponents: [
    ConfigurationGradingComponent,
  ]
})
export class TeacherGradingModule {
}
