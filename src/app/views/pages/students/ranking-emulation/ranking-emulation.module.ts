import { RankingEmulationComponent } from './ranking-emulation.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DropDownButtonModule, ButtonGroupModule, ButtonModule, ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule, DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { DropDownListModule, DropDownsModule, SharedModule } from '@progress/kendo-angular-dropdowns';
import { GridModule, BodyModule } from '@progress/kendo-angular-grid';
import { FormFieldModule, InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { PortletModule } from 'src/app/views/partials/content/general/portlet/portlet.module';
import { PartialsModule } from 'src/app/views/partials/partials.module';

// 


@NgModule({
  declarations: [
    RankingEmulationComponent
  ],
  imports: [
    CommonModule,
    ButtonsModule,
    GridModule,
    DateInputsModule,
    PartialsModule,
    InputsModule,
    FormsModule,
    ReactiveFormsModule,
    LabelModule,
    DropDownsModule,
      
    // RouterModule.forChild(routes),
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class RankingEmulationModule { }
