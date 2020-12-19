import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BodyModule, GridModule, PagerModule} from '@progress/kendo-angular-grid';
import {NgbCollapseModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalUpdateDepartmentComponent} from './modalUpdateSchoolFaculty/modalUpdateDepartment.component';
import {DropDownsModule} from '@progress/kendo-angular-dropdowns';
import {ButtonModule} from '@progress/kendo-angular-buttons';
import {DialogModule} from '@progress/kendo-angular-dialog';
import {ClassSubjectModule} from '../class-subject/class-subject.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormFieldModule, TextBoxModule} from '@progress/kendo-angular-inputs';
import {SchoolFacultyComponent} from './school-faculty.component';
import { PartialsModule } from 'src/app/views/partials/partials.module';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  declarations: [
    SchoolFacultyComponent,
    ModalUpdateDepartmentComponent
  ],
  imports: [
    GridModule,
    CommonModule,
    NgbCollapseModule,
    NgbModalModule,
    DropDownsModule,
    ButtonModule,
    DialogModule,
    ClassSubjectModule,
    PagerModule,
    FormsModule,
    ReactiveFormsModule,
    FormFieldModule,
    SharedModule,
    BodyModule,
    TextBoxModule,
    PartialsModule,
    SharedModule,
    SharedModule
  ],
  entryComponents: [
    ModalUpdateDepartmentComponent
  ]
})
export class SchoolFacultyModule {

}
