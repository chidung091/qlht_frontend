import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailProfileStudentComponent } from './detail-profile-student.component';
import { CommendationDisciplineComponent } from './commendation-discipline/commendation-discipline.component';
import { DetailStudentComponent } from './detail-student/detail-student.component';
import { HealthResultsComponent } from './health-results/health-results.component';
import { StudyProcessComponent } from './study-process/study-process.component';
import { ViolateExemptionsComponent } from './violate-exemptions/violate-exemptions.component';
import { RouterModule, Routes } from '@angular/router';
import { PortletModule } from "../../../../partials/content/general/portlet/portlet.module";
import { PartialsModule } from '../../../../partials/partials.module';
import { BodyModule, GridModule, RowFilterModule } from '@progress/kendo-angular-grid';
import { NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { ButtonGroupModule, ButtonModule } from "@progress/kendo-angular-buttons";
import { DropDownListModule } from "@progress/kendo-angular-dropdowns";

const DetailRecordRoutes: Routes = [
  {
    path: '',
    component: DetailProfileStudentComponent,
    children: [
      {
        path: '',
        component: DetailProfileStudentComponent
      },
    ]
  },
];

@NgModule({
  declarations: [
    DetailProfileStudentComponent,
    CommendationDisciplineComponent,
    DetailStudentComponent,
    HealthResultsComponent,
    StudyProcessComponent,
    ViolateExemptionsComponent
  ],
  imports: [
    CommonModule,
    [RouterModule.forChild(DetailRecordRoutes)],
    PartialsModule,
    GridModule,
    NgbNavModule,
    ButtonGroupModule,
    ButtonModule,
    RowFilterModule,
    BodyModule,
    PortletModule,
    DropDownListModule
  ]
})
export class DetailProfileStudentModule { }
