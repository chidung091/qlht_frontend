import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DetailEvaluationRewardComponent } from './detail-evaluation-reward/detail-evaluation-reward.component';
import { EvaluationRewardComponent } from './evaluation-reward.component';
import { ButtonModule, DropDownButtonModule } from '@progress/kendo-angular-buttons';
import { PartialsModule } from '../../../partials/partials.module';
import { BodyModule, GridModule, PagerModule, SharedModule } from '@progress/kendo-angular-grid';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { FormsModule } from '@angular/forms';
import { EmulationCriteriaModule } from '../../categories/emulation-criteria/emulation-criteria.module';


const routes: Routes = [
  {
    path: '',
    component: EvaluationRewardComponent
  },
  {
    path: 'detail-evaluation-reward',
    component: DetailEvaluationRewardComponent
  }
];

@NgModule({
  declarations: [
    DetailEvaluationRewardComponent,
    EvaluationRewardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    PartialsModule,
    GridModule,
    BodyModule,
    SharedModule,
    DropDownListModule,
    FormsModule,
    PagerModule,
    EmulationCriteriaModule,
    DropDownButtonModule,
  ]
})
export class EvaluationRewardModule {
}
