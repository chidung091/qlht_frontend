import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClassSubjectComponent} from './class-subject.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {SearchComponent} from '../search/search.component';
import {DropDownsModule} from '@progress/kendo-angular-dropdowns';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BodyModule, GridModule} from '@progress/kendo-angular-grid';
import {ButtonsModule} from '@progress/kendo-angular-buttons';
import {NumericTextBoxModule, TextBoxModule} from '@progress/kendo-angular-inputs';
import {DialogModule} from '@progress/kendo-angular-dialog';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';
import {PartialsModule} from '../../../partials/partials.module';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  declarations: [
    ClassSubjectComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    DropDownsModule,
    FormsModule,
    CommonModule,
    GridModule,
    ButtonsModule,
    TextBoxModule,
    BodyModule,
    SharedModule,
    ReactiveFormsModule,
    NumericTextBoxModule,
    DialogModule,
    NgxTrimDirectiveModule,
    PartialsModule,
    SharedModule
  ],
  exports: [
    SearchComponent
  ],
  entryComponents: []
})
export class ClassSubjectModule {
}
