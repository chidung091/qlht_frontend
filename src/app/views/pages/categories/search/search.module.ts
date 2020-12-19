import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchComponent} from './search.component';
import {DropDownListModule} from '@progress/kendo-angular-dropdowns';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PartialsModule} from "../../../partials/partials.module";
import {InputsModule} from "@progress/kendo-angular-inputs";
import {CoreModule} from '../../../../core/core.module';




@NgModule({
  declarations: [
    SearchComponent
  ],
  exports: [
    SearchComponent
  ],
    imports: [
        CommonModule,
        DropDownListModule,
        FormsModule,
        PartialsModule,
        InputsModule,
        ReactiveFormsModule,
        CoreModule
    ]
})
export class SearchModule { }
