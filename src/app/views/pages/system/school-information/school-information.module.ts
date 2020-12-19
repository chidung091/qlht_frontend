import {NgModule} from '@angular/core';
import {SchoolInformationComponent} from './school-information.component';
import {SchoolPlaceComponent} from './school-place/school-place.component';
import {OtherSchoolInformationComponent} from './other-school-information/other-school-information.component';
import {GeneralInformationComponent} from './general-information/general-information.component';
import {ButtonsModule} from '@progress/kendo-angular-buttons';
import {CommonModule, DatePipe} from '@angular/common';
import {BodyModule, GridModule, PagerModule} from '@progress/kendo-angular-grid';
import {DropDownsModule} from '@progress/kendo-angular-dropdowns';
import {DialogsModule} from '@progress/kendo-angular-dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CheckBoxModule, InputsModule} from '@progress/kendo-angular-inputs';
import {DatePickerModule} from '@progress/kendo-angular-dateinputs';
import {UploadFileModule} from '../../../upload-file/upload-file.module';
import {UploadFileImgModule} from 'src/app/views/upload-file-img/upload-file-img.module';
import {PartialsModule} from '../../../partials/partials.module';
import {SharedModule} from '../../../shared/shared.module';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {ActionComponent} from './school-place/action/action.component';
import {DeleteComponent} from './school-place/delete/delete.component';
import {CoreModule} from '../../../../core/core.module';

@NgModule({
  declarations: [
    SchoolInformationComponent,
    SchoolPlaceComponent,
    OtherSchoolInformationComponent,
    GeneralInformationComponent,
    ActionComponent,
    DeleteComponent,
  ],
    imports: [
        PartialsModule,
        ButtonsModule,
        CommonModule,
        GridModule,
        BodyModule,
        PagerModule,
        DropDownsModule,
        DialogsModule,
        FormsModule,
        CheckBoxModule,
        InputsModule,
        ReactiveFormsModule,
        DatePickerModule,
        UploadFileModule,
        UploadFileImgModule,
        SharedModule,
        NgbTooltipModule,
        TranslateModule,
        CoreModule,
    ],
  providers: [DatePipe],
  exports: [
    ActionComponent,
    DeleteComponent,
    SchoolInformationComponent
  ],
  entryComponents: [
    ActionComponent,
    DeleteComponent
  ]
})
export class SchoolInformationModule {
}
