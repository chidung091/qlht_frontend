import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StandardAssessmentComponent } from './standard-assessment/standard-assessment.component';
import {OfficersComponent} from './officers.component';
import {ViolationModule} from '../categories/violation/violation.module';
import {SearchModule} from './search/search.module';
import {ButtonModule, DropDownButtonModule} from '@progress/kendo-angular-buttons';
import {AutoCompleteModule, ComboBoxModule, DropDownListModule} from '@progress/kendo-angular-dropdowns';
import {DivisiveConfiguarationComponent} from './teaching-schedules/divisive-configuaration/divisive-configuaration.component';
import {TeachingSchedulesComponent} from './teaching-schedules/teaching-schedules.component';
import {DistributeProgramComponent} from './teaching-schedules/distribute-program/distribute-program.component';
import {TeachingScheduleComponent} from './teaching-schedules/teaching-schedule/teaching-schedule.component';
import  {ManagementTeachingScheduleComponent} from './teaching-schedules/management-teaching-schedule/management-teaching-schedule.component';
import {NgbModalModule, NgbNavModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import { TeacherGradingComponent } from './teacher-grading/teacher-grading.component';
import {MatIconModule} from '@angular/material/icon';
import {BodyModule, ColumnMenuModule, ExcelModule, GridModule, PagerModule, SharedModule} from '@progress/kendo-angular-grid';
import { SearchBoxDivisiveConfiguarationComponent } from './teaching-schedules/divisive-configuaration/search-box-divisive-configuaration/search-box-divisive-configuaration.component';
import { ModalAddEditDivisiveConfigurationComponent } from './teaching-schedules/divisive-configuaration/modal-add-edit-divisive-configuration/modal-add-edit-divisive-configuration.component';
import {DialogModule} from '@progress/kendo-angular-dialog';
import {CheckBoxModule, FormFieldModule, TextBoxModule} from '@progress/kendo-angular-inputs';
import {LabelModule} from '@progress/kendo-angular-label';
import { SearchBoxDistributeProgramComponent } from './teaching-schedules/distribute-program/search-box-distribute-program/search-box-distribute-program.component';
import { ModalAddEditDistributeProgramComponent } from './teaching-schedules/distribute-program/modal-add-edit-distribute-program/modal-add-edit-distribute-program.component';
import { ModalApplyMultipleLayersComponent } from './teaching-schedules/distribute-program/modal-apply-multiple-layers/modal-apply-multiple-layers.component';
import { SearchBoxManagementTeachingScheduleComponent } from './teaching-schedules/management-teaching-schedule/search-box-management-teaching-schedule/search-box-management-teaching-schedule.component';
import { SearchBoxTeachingScheduleComponent } from './teaching-schedules/teaching-schedule/search-box-teaching-schedule/search-box-teaching-schedule.component';
import { HeadTeacherAssignmentComponent } from './head-teacher-assignment/head-teacher-assignment.component';
import {FormsModule , ReactiveFormsModule} from '@angular/forms';
import {ExcelExportModule} from '@progress/kendo-angular-excel-export';
import {TabStripModule} from '@progress/kendo-angular-layout';
import {NgxsModule} from '@ngxs/store';
import {DepartmentState} from '../../../core/service/states/department.state';
import {AssignmentMinistryComponent} from './assignment-ministry/assignment-ministry.component';
import {NgbCollapseModule, } from '@ng-bootstrap/ng-bootstrap';
import { ListHeadTeacherAssignmentComponent } from './head-teacher-assignment/list-head-teacher-assignment/list-head-teacher-assignment.component';
import { ListHeadTeacherSubstituonsComponent } from './head-teacher-assignment/list-head-teacher-substituons/list-head-teacher-substituons.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {TooltipModule} from '@progress/kendo-angular-tooltip';
import { ConcurrentWorkAssignmentComponent } from './concurrent-work-assignment/concurrent-work-assignment.component';
import {ConcurrentWorkAssignmentModule} from './concurrent-work-assignment/concurrent-work-assignment.module';
import {TeacherGradingModule} from './teacher-grading/teacher-grading.module';
import {EmployeePraiseDisciplineComponent} from './employee-praise-discipline/employee-praise-discipline.component';
import {EmployeePraiseDisciplineState} from '../../../core/service/states/EmployeePraiseDiscipline.state';
import {EmployeePraiseDisciplineModule} from './employee-praise-discipline/employee-praise-discipline.module';
import {PartialsModule} from '../../partials/partials.module';
import {PortletModule} from '../../partials/content/general/portlet/portlet.module';
import { ModalAddEditHeadTeacherSubstitutionsComponent } from './head-teacher-assignment/list-head-teacher-substituons/modal-add-edit-head-teacher-substitutions/modal-add-edit-head-teacher-substitutions.component';
import {HeadTeacherAssignmentModule} from './head-teacher-assignment/head-teacher-assignment.module';
import {EmployeeProfileComponent} from './employee-profile/employee-profile.component';
import {AddNewEmployeeProfileComponent} from './employee-profile/add-new-employee-profile/add-new-employee-profile.component';
import {EmployeeProfileModule} from './employee-profile/employee-profile.module';
import {EditEmployeeProfileComponent} from './employee-profile/edit-employee-profile/edit-employee-profile.component';
import {ProvinceState} from '../../../core/service/states/province.state';
import {DistrictState} from '../../../core/service/states/district.state';
import {WardsState} from '../../../core/service/states/wards.state';
import {CatalogState} from '../../../core/service/states/catalog.state';
import { HonourAchivementModule } from './honour-achivement/honour-achivement.module';
import {AssignmentTeachingComponent} from './assignment-teaching/assignment-teaching.component';
import {AssignmentTeachingModule} from './assignment-teaching/assignment-teaching.module';
import {TreeViewModule} from '@progress/kendo-angular-treeview';
import { MinistryComponent } from './assignment-ministry/ministry/ministry.component';

// Đánh giá chuẩn nghề nghiệp--standard-assessment

const OfficersRoutes: Routes = [
  {
    path: '',
    component: OfficersComponent
  },
  {
    path: 'standard-assessment',
    component: StandardAssessmentComponent
  },
  {
    path: 'teaching-schedules',
    component: TeachingSchedulesComponent
  },
  {
    path: 'divisive-configuaration',
    component: DivisiveConfiguarationComponent
  },
  {
    path: 'distribute-program',
    component: DistributeProgramComponent
  },
  {
    path: 'teaching-schedule',
    component: TeachingScheduleComponent
  },
  {
    path: 'management-teaching-schedule',
    component: ManagementTeachingScheduleComponent
  },
  {
    path: 'teacher-grading',
    component: TeacherGradingComponent
  },
  {
    path:'head-teacher',
    loadChildren: () => import('./head-teacher-assignment/head-teacher-assignment.module').then(m => m.HeadTeacherAssignmentModule)
  },
  {
    path:'assignment-ministry',
    component:AssignmentMinistryComponent
  },
  {
    path:'concurrent-work-assignment',
    component:ConcurrentWorkAssignmentComponent
  },
  {
    path: 'concurrent-work-assignment',
    loadChildren: () => import('./concurrent-work-assignment/concurrent-work-assignment.module').then(m => m.ConcurrentWorkAssignmentModule)
  },
  {
    path: 'employee-praise-discipline',
    loadChildren: () => import('./employee-praise-discipline/employee-praise-discipline.module').then(m => m.EmployeePraiseDisciplineModule)
  },
  {
    path: 'teacher-grading',
    loadChildren: () => import('./teacher-grading/teacher-grading.module').then(m => m.TeacherGradingModule)
  },
  {
    path: 'employee-profile',
    component: EmployeeProfileComponent,
  },
  {
    path: 'employee-profile/add-new-profile',
    component: AddNewEmployeeProfileComponent,
  },
  {
    path: 'employee-profile/edit-profile/:id',
    component: EditEmployeeProfileComponent
  },
  {
    path: 'assignment-teaching',
    component: AssignmentTeachingComponent,
  },
  {
    path: 'honour-achivement',
    loadChildren: () => import('./honour-achivement/honour-achivement.module').then(m => m.HonourAchivementModule)
  },
  {
    path: 'assignment-ministry/ministry',
    component: MinistryComponent,
  },
]

@NgModule({
  declarations: [
    StandardAssessmentComponent,
    TeachingSchedulesComponent,
    DivisiveConfiguarationComponent,
    DistributeProgramComponent,
    TeachingScheduleComponent,
    ManagementTeachingScheduleComponent,
    SearchBoxDivisiveConfiguarationComponent,
    ModalAddEditDivisiveConfigurationComponent,
    SearchBoxDistributeProgramComponent,
    ModalAddEditDistributeProgramComponent,
    ModalApplyMultipleLayersComponent,
    SearchBoxManagementTeachingScheduleComponent,
    SearchBoxTeachingScheduleComponent,
    EmployeePraiseDisciplineComponent,
    SearchBoxDivisiveConfiguarationComponent,
    SearchBoxDivisiveConfiguarationComponent,
    HeadTeacherAssignmentComponent,
    AssignmentMinistryComponent,
    MinistryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(OfficersRoutes),
    NgxsModule.forRoot([
      EmployeePraiseDisciplineState,
      DepartmentState,
      ProvinceState,
      DistrictState,
      WardsState,
      CatalogState,
    ]),
    ViolationModule,
    SearchModule,
    ButtonModule,
    DropDownListModule,
    ReactiveFormsModule,
    FormsModule,
    GridModule,
    BodyModule,
    SharedModule,
    DialogModule,
    CheckBoxModule,
    LabelModule,
    DropDownButtonModule,
    ComboBoxModule,
    MatIconModule,
    NgbNavModule,
    EmployeePraiseDisciplineModule,
    HeadTeacherAssignmentModule,
    ReactiveFormsModule,
    NgbModalModule,
    GridModule,
    FormsModule,
    ExcelExportModule,
    PagerModule,
    ColumnMenuModule,
    ExcelModule,
    TextBoxModule,
    TabStripModule,
    NgbCollapseModule,
    NgbNavModule,
    TooltipModule,
    ConcurrentWorkAssignmentModule,
    TeacherGradingModule,
    PortletModule,
    EmployeeProfileModule,
    HonourAchivementModule,
    NgbTooltipModule,
    AssignmentTeachingModule,
    TreeViewModule
  ]
})
export class OfficersModule { }
