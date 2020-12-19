import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogModule} from '@progress/kendo-angular-dialog';
import {ModalAddEditComponent} from './modal-add-edit/modal-add-edit.component';
import {IntlModule} from '@progress/kendo-angular-intl';
import {DateInputsModule} from '@progress/kendo-angular-dateinputs';
import {NgSelectModule} from '@ng-select/ng-select';
import {CoreModule} from '../../../../core/core.module';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {SchoolYearComponent} from './school-year.component';
import {PortletModule} from '../../../partials/content/general/portlet/portlet.module';
import {ButtonModule} from '@progress/kendo-angular-buttons';
import {GridModule} from '@progress/kendo-angular-grid';
import {DropDownListModule} from '@progress/kendo-angular-dropdowns';
import {FormFieldModule} from '@progress/kendo-angular-inputs';
import { TooltipModule } from '@progress/kendo-angular-tooltip';

@NgModule({
  declarations: [
    SchoolYearComponent,
    ModalAddEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    DateInputsModule,
    CoreModule,
    NgSelectModule,
    NgbTooltipModule,
    PortletModule,
    ButtonModule,
    GridModule,
    DropDownListModule,
    FormFieldModule,
    TooltipModule,
    IntlModule
  ],
  entryComponents: [
    ModalAddEditComponent
  ]
})
export class SchoolYearModule {
}
