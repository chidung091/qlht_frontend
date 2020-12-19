import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TakeAttendanceComponent} from "./take-attendance.component";
import {Router, RouterModule, Routes} from "@angular/router";
import {TreeViewModule} from "@progress/kendo-angular-treeview";
import {PortletModule} from "../../../partials/content/general/portlet/portlet.module";
import {DropDownListModule} from "@progress/kendo-angular-dropdowns";
import {GridModule, SharedModule} from "@progress/kendo-angular-grid";
import {ButtonModule, DropDownButtonModule} from "@progress/kendo-angular-buttons";

const routes: Routes = [
  {
    path:'',
    component:TakeAttendanceComponent
  }
]

@NgModule({
  declarations: [
    TakeAttendanceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TreeViewModule,
    PortletModule,
    DropDownListModule,
    GridModule,
    SharedModule,
    DropDownButtonModule,
    ButtonModule
  ]
})
export class TakeAttendanceModule { }
