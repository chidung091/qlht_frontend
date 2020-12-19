import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DataInitializationComponent} from './data-initialization.component';
import {LayoutModule} from '@progress/kendo-angular-layout';
import {SchoolInformationModule} from '../school-information/school-information.module';
import {ButtonsModule} from '@progress/kendo-angular-buttons';
import {BodyModule, GridModule, SharedModule} from '@progress/kendo-angular-grid';
import {DialogsModule} from '@progress/kendo-angular-dialog';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: DataInitializationComponent,
  },
  {
    path: 'step2',
    component: DataInitializationComponent,
  },
  {
    path: 'step3',
    component: DataInitializationComponent,
  }
]

@NgModule({
  declarations: [
    DataInitializationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    SchoolInformationModule,
    ButtonsModule,
    GridModule,
    SharedModule,
    BodyModule,
    DialogsModule,
    FormsModule,
  ]
})
export class DataInitializationModule {
}
