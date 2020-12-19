import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RewardFinalComponent} from './reward-final.component';
import {SearchModule} from '../search/search.module';
import {ActionRewardFinalComponent} from './action-reward-final/action-reward-final.component';
import {DialogsModule} from "@progress/kendo-angular-dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputsModule} from "@progress/kendo-angular-inputs";
import {PartialsModule} from "../../../partials/partials.module";
import {ButtonsModule} from "@progress/kendo-angular-buttons";
import {BodyModule, GridModule, PagerModule} from "@progress/kendo-angular-grid";
import {DropDownsModule} from "@progress/kendo-angular-dropdowns";
import {SharedModule} from "../../../shared/shared.module";
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [
    RewardFinalComponent,
    ActionRewardFinalComponent,
  ],
  imports: [
    CommonModule,
    SearchModule,
    DialogsModule,
    ReactiveFormsModule,
    InputsModule,
    PartialsModule,
    ButtonsModule,
    GridModule,
    BodyModule,
    PagerModule,
    DropDownsModule,
    FormsModule,
    SharedModule,
    NgbTooltipModule,
  ]
})
export class RewardFinalModule { }
