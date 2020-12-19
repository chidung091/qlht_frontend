import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionFaultCriteriaComponent } from './action-fault-criteria/action-fault-criteria.component';
import {DialogModule} from '@progress/kendo-angular-dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormFieldModule, TextBoxModule} from '@progress/kendo-angular-inputs';
import {DropDownListModule} from '@progress/kendo-angular-dropdowns';
import {FaultCriteriaComponent} from './fault-criteria.component';
import {BodyModule, GridModule, PagerModule,} from '@progress/kendo-angular-grid';
import {SearchModule} from '../search/search.module';
import {ButtonsModule} from '@progress/kendo-angular-buttons';
import {PortletModule} from '../../../partials/content/general/portlet/portlet.module';
import {CoreModule} from '../../../../core/core.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../../../shared/shared.module';



@NgModule({
  declarations: [
    ActionFaultCriteriaComponent,
    FaultCriteriaComponent,
  ],
  exports: [
    ActionFaultCriteriaComponent
  ],
    imports: [
        CommonModule,
        DialogModule,
        ReactiveFormsModule,
        FormFieldModule,
        DropDownListModule,
        FormsModule,
        GridModule,
        BodyModule,
        SearchModule,
        PagerModule,
        ButtonsModule,
        PortletModule,
        SharedModule,
        CoreModule,
        NgbModule,
        SharedModule,
        TextBoxModule
    ]
})
export class FaultCriteriaModule { }
