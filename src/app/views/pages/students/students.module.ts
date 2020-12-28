import { RankingEmulationModule } from './ranking-emulation/ranking-emulation.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { ReceptionStudentsComponent } from './reception-students/reception-students.component';
import { StudentAssessmentComponent } from './student-assessment/student-assessment.component';
import { StudentRecordsComponent } from './student-records/student-records.component';
import { EvaluationRewardComponent } from './evaluation-reward/evaluation-reward.component';
import { RankingEmulationComponent } from './ranking-emulation/ranking-emulation.component';
import { CommentBookComponent } from './comment-book/comment-book.component';
import { StudentRecordsModule } from './student-records/student-records.module';
import { AddProfileComponent } from './student-records/profile-student/add-profile/add-profile.component';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ReceptionStudentsModule } from './reception-students/reception-students.module';
import {ButtonGroupModule, ButtonModule, DropDownButtonModule} from '@progress/kendo-angular-buttons';
import {PartialsModule} from '../../partials/partials.module';
import {EvaluationRewardModule} from './evaluation-reward/evaluation-reward.module';
import {StudentAssessmentModule} from './student-assessment/student-assessment.module';
import {ClassroomSelectorComponent} from './classroom-selector/classroom-selector.component';
import {TreeViewModule} from '@progress/kendo-angular-treeview';
import {BodyModule, GridModule} from '@progress/kendo-angular-grid';
import {FormFieldModule} from '@progress/kendo-angular-inputs';
import {DropDownListModule} from '@progress/kendo-angular-dropdowns';
import {LabelModule} from '@progress/kendo-angular-label';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ElectiveSubjectsComponent} from './elective-subjects/elective-subjects.component';
import {PopupModule} from '@progress/kendo-angular-popup';
import { DetailCommentBookComponent } from './comment-book/detail-comment-book/detail-comment-book.component';
import {EmployeeComponent} from "../../../employee/employee.component";
import {StatisticalComponent} from "../../../statistical/statistical.component";


const StudentRoutes: Routes = [
  {
    path: '',
    component: StudentsComponent
  },
  {
    path: 'employee',
    component: EmployeeComponent,
  },
  {
    path: 'thongke',
    component: StatisticalComponent,
  },
  {
    path: 'student-records',
    loadChildren: () => import('./student-records/student-records.module').then(m => m.StudentRecordsModule),
  },
  {
    path: 'student-assessment',
    loadChildren: () => import('./student-assessment/student-assessment.module').then(m => m.StudentAssessmentModule),
  },
  {
    path: 'add-student', // thêm mới học sinh
    component: AddProfileComponent
  },
  {
    path: 'reception-students', // tiếp nhận học sinh chuyển trường
    loadChildren: () => import('./reception-students/reception-students.module').then(m => m.ReceptionStudentsModule),
  },
  {
    path: 'take-attendance', // Điểm danh
    loadChildren: () => import('./take-attendance/take-attendance.module').then(m => m.TakeAttendanceModule),
  },
  {
    path: 'violate-rules', // Vi phạm
    loadChildren: () => import('./violate-rules/violate-rules.module').then(m => m.ViolateRulesModule),
  },
  {
    path: 'student-assessment', // sổ đánh giá học sinh
    loadChildren: () => import('./student-assessment/student-assessment.module').then(m => m.StudentAssessmentModule),
  },
  {
    path: 'evaluation-rewardt', // Đánh giá khen thưởng
    component: EvaluationRewardComponent
  },
  {
    path: 'ranking-emulation', // Xếp hạng thi đua
    component: RankingEmulationComponent
  },
  {
    path: 'comment-book', // sổ ghi nhận xét
   // component: CommentBookComponent
    loadChildren: () => import('./comment-book/comment-book.module').then(m => m.CommentBookModule)
  },
  {
    path:'detail-comment-book/:id',
    component: DetailCommentBookComponent
  },

  {

    path: 'elective-subjects', // sổ ghi nhận xét
    component: ElectiveSubjectsComponent
  },
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: '**', redirectTo: 'students', pathMatch: 'full' },
]


@NgModule({
  declarations: [
    ClassroomSelectorComponent,
    // CommentBookComponent,
    ReceptionStudentsComponent,
    StudentAssessmentComponent,
    StudentRecordsComponent,
    //CommentBookComponent,
    ElectiveSubjectsComponent,
    DetailCommentBookComponent
    // RankingEmulationComponent
  ],
  exports: [
    ClassroomSelectorComponent,
  ],
  imports: [
    CommonModule,
    StudentRecordsModule,
    // CommentBookModule,
    RouterModule.forChild(StudentRoutes),
    RankingEmulationModule,
    NgbModule,
    ReceptionStudentsModule,
    DropDownButtonModule,
    PartialsModule,
    EvaluationRewardModule,
    StudentAssessmentModule,
    ButtonModule,
    TreeViewModule,
    GridModule,
    BodyModule,
    FormFieldModule,
    DropDownListModule,
    LabelModule,
    ReactiveFormsModule,
    PopupModule,
    ButtonGroupModule,
    FormsModule
  ]
})
export class StudentsModule { }
