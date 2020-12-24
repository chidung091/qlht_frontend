import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAddEitMedicineComponent } from './modal-add-eit-medicine/modal-add-eit-medicine.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ModalDeleteMedicineComponent } from './modal-delete-medicine/modal-delete-medicine.component';
import {PartialsModule} from "../views/partials/partials.module";
import {NgbCollapseModule} from "@ng-bootstrap/ng-bootstrap";
import {TextBoxModule} from "@progress/kendo-angular-inputs";



@NgModule({
  declarations: [ModalAddEitMedicineComponent, ModalDeleteMedicineComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PartialsModule,
        NgbCollapseModule,
        TextBoxModule
    ],
  entryComponents: [
    ModalAddEitMedicineComponent,
    ModalDeleteMedicineComponent
  ]
})
export class MedicineModule { }
