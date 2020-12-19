import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StudentAssessmentComponent} from './student-assessment.component';
import {PartialsModule} from '../../../partials/partials.module';
import {BodyModule, GridModule, PagerModule, SharedModule} from '@progress/kendo-angular-grid';
import {DropDownListModule} from '@progress/kendo-angular-dropdowns';
import {FormsModule} from '@angular/forms';
import { DetailSubjectsComponent } from './detail-subjects/detail-subjects.component';


const StudentAssessmentRoutes : Routes = [
    {
      path: '',
      component: StudentAssessmentComponent,
      children: [
        {
          path: 'detail-subjects/:id',
          component: DetailSubjectsComponent
        },
        {
          path: 'detail-subjects',
          component: DetailSubjectsComponent
        },
        {
          path: '', redirectTo: 'detail-subjects', pathMatch: 'full'
        },
      ]
    },
  ];

@NgModule({
  declarations: [
    DetailSubjectsComponent,
  ],
  imports: [
    CommonModule,
    PartialsModule,
    [RouterModule.forChild(StudentAssessmentRoutes)],
    GridModule,
    BodyModule,
    SharedModule,
    DropDownListModule,
    FormsModule,
    PagerModule,
  ]
})
export class StudentAssessmentModule { }
