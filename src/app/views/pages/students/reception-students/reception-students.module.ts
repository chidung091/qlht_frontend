import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceptionComponent } from './reception/reception.component';
import { ClassificationComponent } from './classification/classification.component';
import {RouterModule, Routes} from '@angular/router';
import {ReceptionStudentsComponent} from './reception-students.component';
import {DropDownListModule} from '@progress/kendo-angular-dropdowns';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from '@progress/kendo-angular-buttons';
import {BodyModule, GridModule, PagerModule, SharedModule} from '@progress/kendo-angular-grid';
import {PartialsModule} from '../../../partials/partials.module';
import {DialogModule} from '@progress/kendo-angular-dialog';
import {DatePickerModule} from '@progress/kendo-angular-dateinputs';
import {FormFieldModule} from '@progress/kendo-angular-inputs';
import {NgbModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';

const ReceptionStudentRoutes: Routes = [
  {
    path: '',
    component: ReceptionStudentsComponent,
  },
];

@NgModule({
  declarations: [
    ReceptionComponent,
    ClassificationComponent,
  ],
  exports: [
    ReceptionComponent,
    ClassificationComponent
  ],
  imports: [
    CommonModule,
    [RouterModule.forChild(ReceptionStudentRoutes)],
    DropDownListModule,
    ReactiveFormsModule,
    ButtonModule,
    GridModule,
    SharedModule,
    FormsModule,
    BodyModule,
    PartialsModule,
    DialogModule,
    DatePickerModule,
    FormFieldModule,
    NgbTooltipModule,
    NgbModule,
    PagerModule,
  ]
})
export class ReceptionStudentsModule { }
