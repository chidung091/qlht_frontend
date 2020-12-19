import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectiveSubjectsComponent } from './elective-subjects.component';
import {RouterModule, Routes} from '@angular/router';
import {DropDownListModule} from '@progress/kendo-angular-dropdowns';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule, ButtonsModule} from '@progress/kendo-angular-buttons';
import {BodyModule, GridModule, PagerModule, SharedModule} from '@progress/kendo-angular-grid';
import {PartialsModule} from '../../../partials/partials.module';
import {DialogModule} from '@progress/kendo-angular-dialog';
import {DatePickerModule} from '@progress/kendo-angular-dateinputs';
import {FormFieldModule} from '@progress/kendo-angular-inputs';
import {NgbModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {PopupModule} from '@progress/kendo-angular-popup';
import {TreeViewModule} from '@progress/kendo-angular-treeview';

const ElectiveSubjectRoutes: Routes = [
  {
    path: '',
    component: ElectiveSubjectsComponent,
  },
];


@NgModule({
  declarations: [
    ElectiveSubjectsComponent
  ],
  imports: [
    CommonModule,
    [RouterModule.forChild(ElectiveSubjectRoutes)],
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
    PopupModule,
    TreeViewModule,
    ButtonsModule,
  ]
})
export class ElectiveSubjectsModule { }
