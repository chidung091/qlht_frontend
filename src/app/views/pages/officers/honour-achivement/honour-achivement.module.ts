import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HonourAchivementComponent } from '../honour-achivement/honour-achivement.component';
import { RouterModule, Routes } from '@angular/router';
import { EmulationTitleComponent } from './emulation-title/emulation-title.component';
import { CollectiveCompetitionComponent } from './collective-competition/collective-competition.component';
import { PartialsModule } from 'src/app/views/partials/partials.module';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { AddCollectiveCompetitionComponent } from './collective-competition/add-collective-competition/add-collective-competition.component';
import { ReactiveFormsModule, FormsModule, } from '@angular/forms';
import { AddEmulationTitleComponent } from './emulation-title/add-emulation-title/add-emulation-title.component';
import { DeleteCollectiveCompetitionComponent } from './collective-competition/delete-collective-competition/delete-collective-competition.component';
import { DeleteEmulationTitleComponent } from './emulation-title/delete-emulation-title/delete-emulation-title.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const HonourAchivementRoutes: Routes = [
  {
    path: '',
    component: HonourAchivementComponent,
    children: [
      {
        path: 'emulation-title', //Danh hiệu thi đua
        component: EmulationTitleComponent
      },
      {
        path: 'collective-competition', //Danh hiệu thi đua tập thể
        component: CollectiveCompetitionComponent
      },
      {
        path: '', redirectTo: 'emulation-title', pathMatch: 'full'
      },
    ]
  },
];

@NgModule({
  declarations: [
    HonourAchivementComponent, 
    EmulationTitleComponent, 
    CollectiveCompetitionComponent, AddCollectiveCompetitionComponent, AddEmulationTitleComponent, DeleteCollectiveCompetitionComponent, DeleteEmulationTitleComponent
  ],
  imports: [
    CommonModule,
    [RouterModule.forChild(HonourAchivementRoutes)],
    PartialsModule,
    GridModule,
    DropDownListModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  entryComponents: [
    AddCollectiveCompetitionComponent,
    AddEmulationTitleComponent,
    DeleteCollectiveCompetitionComponent,
    DeleteEmulationTitleComponent
  ]
})
export class HonourAchivementModule { }
