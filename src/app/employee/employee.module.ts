import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAddEitEmployeeComponent } from './modal-add-eit-employee/modal-add-eit-employee.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ModalDeleteEmployeeComponent } from './modal-delete-employee/modal-delete-employee.component';
import {DatePickerModule} from "@progress/kendo-angular-dateinputs";



@NgModule({
  declarations: [ModalAddEitEmployeeComponent, ModalDeleteEmployeeComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DatePickerModule
    ],
  entryComponents: [
    ModalAddEitEmployeeComponent,
    ModalDeleteEmployeeComponent
  ]
})
export class EmployeeModule { }
