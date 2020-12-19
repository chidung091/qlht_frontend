import { NgModule } from '@angular/core';
import { EmployeeProfileComponent } from './employee-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile/profile.component';
import { ReceiveSwitchWorkComponent } from './receive-switch-work/receive-switch-work.component';
import { AddNewEmployeeProfileComponent } from './add-new-employee-profile/add-new-employee-profile.component';
import { CommonModule } from '@angular/common';
import {CheckBoxModule, FormFieldModule, TextBoxModule} from '@progress/kendo-angular-inputs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BodyModule, GridModule, PagerModule, SharedModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { EditEmployeeProfileComponent } from './edit-employee-profile/edit-employee-profile.component';
import { ManagementWorkProcessComponent } from './edit-employee-profile/management-work-process/management-work-process.component';
import { EducateInformationComponent } from './edit-employee-profile/educate-information/educate-information.component';
import { SalaryInformationComponent } from './edit-employee-profile/salary-information/salary-information.component';
import { ForeignLanguageInformationComponent } from './edit-employee-profile/foreign-language-information/foreign-language-information.component';
import { PartialsModule } from '../../../partials/partials.module';
import { GeneralInfoComponent } from './add-new-employee-profile/general-info/general-info.component';
import { WorkingPotitionComponent } from './add-new-employee-profile/working-potition/working-potition.component';
import { EducateComponent } from './add-new-employee-profile/educate/educate.component';
import { EvaluationComponent } from './add-new-employee-profile/evaluation/evaluation.component';
import { OrtherInfoComponent } from './add-new-employee-profile/orther-info/orther-info.component';
import { SalaryComponent } from './add-new-employee-profile/salary/salary.component';
import { ButtonModule, DropDownButtonModule } from '@progress/kendo-angular-buttons';
import { TransferWorkComponent } from './profile/transfer-work/transfer-work.component';
import { ModalDeleteEmployeeSalaryComponent } from './edit-employee-profile/salary-information/modal-delete-employee-salary/modal-delete-employee-salary.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ModalDeleteEmployeeWorkComponent } from './edit-employee-profile/management-work-process/modal-delete-employee-work/modal-delete-employee-work.component';
import { IntlModule } from '@progress/kendo-angular-intl';
import { PopupAnchorDirective } from './edit-employee-profile/educate-information/popup.anchor-target.directive';
import { PopupModule } from '@progress/kendo-angular-popup';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { ImportFileExcelComponent } from './profile/import-file-excel/import-file-excel.component';
import {CoreModule} from "../../../../core/core.module";
import {CareerAssessmentComponent} from './add-new-employee-profile/evaluation/career-assessment/career-assessment.component';

@NgModule({
    imports: [
        NgbModule,
        CommonModule,
        TextBoxModule,
        GridModule,
        BodyModule,
        PagerModule,
        DropDownsModule,
        DatePickerModule,
        SharedModule,
        ReactiveFormsModule,
        PartialsModule,
        FormsModule,
        ButtonModule,
        DropDownButtonModule,
        DialogModule,
        IntlModule,
        PopupModule,
        FormFieldModule,
        NgxTrimDirectiveModule,
        CoreModule
    ],
  declarations: [
    EmployeeProfileComponent,
    ProfileComponent,
    ReceiveSwitchWorkComponent,
    AddNewEmployeeProfileComponent,
    EditEmployeeProfileComponent,
    ManagementWorkProcessComponent,
    EducateInformationComponent,
    SalaryInformationComponent,
    ForeignLanguageInformationComponent,
    GeneralInfoComponent,
    WorkingPotitionComponent,
    EducateComponent,
    EvaluationComponent,
    OrtherInfoComponent,
    SalaryComponent,
    ModalDeleteEmployeeSalaryComponent,
    TransferWorkComponent,
    ModalDeleteEmployeeWorkComponent,
    PopupAnchorDirective,
    ImportFileExcelComponent,
    CareerAssessmentComponent
  ],
  entryComponents: [
    ModalDeleteEmployeeSalaryComponent,
    TransferWorkComponent,
    ModalDeleteEmployeeWorkComponent,
    ImportFileExcelComponent,
    CareerAssessmentComponent
  ],
  exports: [
    ManagementWorkProcessComponent,
    SalaryInformationComponent,
    ForeignLanguageInformationComponent,
    EducateInformationComponent
  ]
})
export class EmployeeProfileModule {
}
