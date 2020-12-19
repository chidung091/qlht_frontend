import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {DropDownListModule} from '@progress/kendo-angular-dropdowns';
import {ButtonModule} from '@progress/kendo-angular-buttons';
import {FormsModule} from '@angular/forms';
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    DropDownListModule,
    ButtonModule,
    FormsModule,
    NgbCollapseModule,
  ],
  declarations: []
})
export class SearchModule {

}
