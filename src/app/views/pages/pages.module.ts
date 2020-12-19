// Angular
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';
import { MailModule } from './apps/mail/mail.module';
import { ClassRoomComponent } from './system/class-room/class-room.component';
import {NgbCollapseModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DropDownsModule} from '@progress/kendo-angular-dropdowns';
import {BodyModule, GridModule, PagerModule} from '@progress/kendo-angular-grid';
import {ButtonModule} from '@progress/kendo-angular-buttons';
import {DialogModule} from '@progress/kendo-angular-dialog';
import {SystemModule} from './system/system.module';
import {ClassRoomModule} from './system/class-room/class-room.module';
import {StudentsComponent } from './students/students.component';
import { OfficersComponent } from './officers/officers.component';
import {OfficersModule} from './officers/officers.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ConfigEffects, configReducer, TenantEffects, tenantReducer } from '../../core/auth';
import {ClassSubjectModule} from './system/class-subject/class-subject.module';
import {FormFieldModule} from '@progress/kendo-angular-inputs';
import {TooltipModule} from '@progress/kendo-angular-tooltip';
import { YearEffects, yearReducer } from '../../core/year';
import { YearService } from '../../core/year/_services/year.service';
import { CategoryEffects, cateReducer } from '../../core/category';
import {SharedModule} from '../shared/shared.module';
import { yearLevelSelectorReducer } from '../../core/year-level-selector';
import {employeeSalaryReducer} from "../../core/employee/salary/salary-employee.reducer";
import {CommonEffect, commonReducer} from '../../core/common';
import {EvaluationCriteriaEffects, evaluationReducer} from "../../core/evaluation-criteria";
import {LocationEffect, locationReducer} from '../../core/location';

@NgModule({
  declarations: [
    ClassRoomComponent,
    StudentsComponent,
    OfficersComponent
  ],
  exports: [],

    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        CoreModule,
        PartialsModule,
        MailModule,
        NgbCollapseModule,
        DropDownsModule,
        GridModule,
        ButtonModule,
        ClassSubjectModule,
        PagerModule,
        DialogModule,
        SystemModule,
        ClassRoomModule,
        SharedModule,
        BodyModule,
        OfficersModule,
        StoreModule.forFeature('tenant', tenantReducer),
        StoreModule.forFeature('year', yearReducer),
        StoreModule.forFeature('config', configReducer),
        StoreModule.forFeature('cate', cateReducer),
        StoreModule.forFeature('common', commonReducer),
        StoreModule.forFeature('selected', yearLevelSelectorReducer),
        StoreModule.forFeature('employeeSalary', employeeSalaryReducer),
        StoreModule.forFeature('evaluation', evaluationReducer),
        StoreModule.forFeature('location', locationReducer),
        EffectsModule.forFeature([TenantEffects, YearEffects, ConfigEffects,
          CategoryEffects, CommonEffect, EvaluationCriteriaEffects,
          LocationEffect,
        ]),
        ReactiveFormsModule,
        FormFieldModule,
        NgbModule,
        TooltipModule,
    ],

  providers: [
    YearService
  ]
})
export class PagesModule {
}
