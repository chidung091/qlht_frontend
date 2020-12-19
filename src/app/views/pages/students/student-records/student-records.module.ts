import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StudentRecordsComponent } from './student-records.component';
import { ProfileStudentComponent } from './profile-student/profile-student.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import {BodyModule, GridModule, PagerModule, SharedModule} from '@progress/kendo-angular-grid';
import { DisciplineStudentsComponent } from './discipline-students/discipline-students.component';
import { RewardStudentsComponent } from './reward-students/reward-students.component';
import { ExemptionStudentsComponent } from './exemption-students/exemption-students.component';
import { RecordkeepingStudentsComponent } from './recordkeeping-students/recordkeeping-students.component';
import { IndividualStudentComponent } from './individual-student/individual-student.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { AddProfileComponent } from './profile-student/add-profile/add-profile.component';
import { PartialsModule } from 'src/app/views/partials/partials.module';
import { TransferSchoolComponent } from './transfer-school/transfer-school.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalEditRewardStudentsComponent } from './reward-students/modal-edit-reward-students/modal-edit-reward-students.component';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalEditDisciplineStudentsComponent } from './discipline-students/modal-edit-discipline-students/modal-edit-discipline-students.component';

const StudentRecordRoutes: Routes = [
  {
    path: '',
    component: StudentRecordsComponent,
    children: [
      {
        path: 'profile-student', // tab hồ sơ
        component: ProfileStudentComponent
      },
      {
        path: 'profile-student/add-students', // tạo hồ sơ học sinh
        component: AddProfileComponent
      },
      {
        path: 'detail-profile-student/:idStudent',
        loadChildren: () => import('./detail-profile-student/detail-profile-student.module').then(m => m.DetailProfileStudentModule),
      },
      {
        path: 'exemptions-students', // tab miễn giảm
        component: ExemptionStudentsComponent
      },
      {
        path: 'individual-students', // tab cá biệt
        component: IndividualStudentComponent
      },
      {
        path: 'transfer-school', // tab cá biệt
        component: TransferSchoolComponent
      },
      {
        path: 'reward-students', // tab khen thưởng
        component: RewardStudentsComponent
      },
      {
        path: 'discipline-students', // tab kỷ luật
        component: DisciplineStudentsComponent
      },
      {
        path: 'recordkeeping-students', // tab bảo lưu
        component: RecordkeepingStudentsComponent
      },
      {
        path: '', redirectTo: 'profile-student', pathMatch: 'full'
      }
    ]
  },
];
@NgModule({
  declarations: [
    ProfileStudentComponent,
    RewardStudentsComponent,
    DisciplineStudentsComponent,
    ExemptionStudentsComponent,
    RecordkeepingStudentsComponent,
    IndividualStudentComponent,
    AddProfileComponent,
    TransferSchoolComponent,
    ModalEditRewardStudentsComponent,
    ModalEditDisciplineStudentsComponent
  ],
  imports: [
    CommonModule,
    [RouterModule.forChild(StudentRecordRoutes)],
    DropDownsModule,
    InputsModule,
    GridModule,
    ButtonsModule,
    DateInputsModule,
    PartialsModule,
    FormsModule,
    NgbModalModule,
    ReactiveFormsModule,
    SharedModule,
    BodyModule,
    PagerModule
  ],
  entryComponents: [
    ModalEditRewardStudentsComponent,
    ModalEditDisciplineStudentsComponent
  ]
})
export class StudentRecordsModule { }
