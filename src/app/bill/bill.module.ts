import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DetailProductComponent} from "./detail-product/detail-product.component";
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import { ModalAddBillComponent } from './modal-add-bill/modal-add-bill.component';
import {DatePickerModule} from "@progress/kendo-angular-dateinputs";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModalModule,
    DatePickerModule,
    FormsModule
  ],
  entryComponents: [
    DetailProductComponent,
    ModalAddBillComponent
  ]
})
export class BillModule { }
