import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DisciplinePupilComponent} from './discipline-pupil/discipline-pupil.component';
import {PraisePupilComponent} from './praise-pupil/praise-pupil.component';
import {DropDownListModule} from '@progress/kendo-angular-dropdowns';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {EmployeePraiseDisciplineComponent} from './employee-praise-discipline.component';
import {ButtonModule} from '@progress/kendo-angular-buttons';
import {BodyModule, GridModule} from '@progress/kendo-angular-grid';
import {ModalAddEditComponent} from './modal-add-edit-praise/modal-add-edit.component';
import {PartialsModule} from '../../../partials/partials.module';
import {DialogModule} from '@progress/kendo-angular-dialog';
import {DateInputsModule, DatePickerModule} from '@progress/kendo-angular-dateinputs';
import {FormFieldModule} from '@progress/kendo-angular-inputs';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalDeletePraiseComponent} from './modal-delete-praise/modal-delete-praise.component';
import {ModalDeleteDisciplineComponent} from './modal-delete-discipline/modal-delete-discipline.component';
import {ModalAddEditDisciplineComponent} from './modal-add-edit-discipline/modal-add-edit-discipline.component';
import {SharedModule} from '../../../shared/shared.module';

const EmployeePraiseDisciplineRecordRoutes: Routes = [
  {
    path: '',
    component: EmployeePraiseDisciplineComponent,
    children: [
      {
        path: 'praise-pupil',
        component: PraisePupilComponent
      },
      {
        path: 'discipline-pupil',
        component: DisciplinePupilComponent
      },
      {
        path: '', redirectTo: 'praise-pupil', pathMatch: 'full'
      },
    ]
  },
];

@NgModule({
  declarations: [DisciplinePupilComponent, PraisePupilComponent, ModalAddEditComponent,
    ModalDeletePraiseComponent, ModalAddEditDisciplineComponent, ModalDeleteDisciplineComponent],
  imports: [
    CommonModule,
    DropDownListModule,
    ReactiveFormsModule,
    [RouterModule.forChild(EmployeePraiseDisciplineRecordRoutes)],
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
    SharedModule,
    DateInputsModule,

  ],
  entryComponents: [
    ModalAddEditComponent,
    ModalDeletePraiseComponent,
    ModalAddEditDisciplineComponent,
    ModalDeleteDisciplineComponent
  ]
})
export class EmployeePraiseDisciplineModule {
}
