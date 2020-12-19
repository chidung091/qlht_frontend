import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ClassRoomComponent} from './class-room.component';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatCheckbox, MatCheckboxModule} from '@angular/material/checkbox';
import {DeleteClassRoomComponent} from './delete-class-room/delete-class-room.component';
import {UpdateClassComponent} from './update-class/update-class.component';
import {NgbActiveModal, NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AutoCompleteModule, DropDownListModule, SharedModule} from '@progress/kendo-angular-dropdowns';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogModule} from '@progress/kendo-angular-dialog';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {LabelModule} from '@progress/kendo-angular-label';
import {CheckBoxModule, FormFieldModule, TextBoxModule} from '@progress/kendo-angular-inputs';
import {SchoolInformationState} from '../../../../core/service/states/school-information-state';
import {NgxsModule} from '@ngxs/store';
import {ClassroomState} from '../../../../core/service/states/classroom.state';
import {CatalogState} from '../../../../core/service/states/catalog.state';
import {MatButtonModule} from '@angular/material/button';

const routes: Routes = [
  {
    path: '',
    component: ClassRoomComponent,
  }
]

@NgModule({
  declarations: [
    UpdateClassComponent,
    DeleteClassRoomComponent,
  ],
  imports: [
    CommonModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    NgbModalModule,
    RouterModule.forChild(routes),
    NgxsModule.forRoot([SchoolInformationState, ClassroomState, CatalogState]),
    DropDownListModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    PerfectScrollbarModule,
    LabelModule,
    CheckBoxModule,
    AutoCompleteModule,
    FormFieldModule,
    TextBoxModule,
    MatButtonModule,
    NgbModule,
  ],

  exports: [
    UpdateClassComponent,
    DeleteClassRoomComponent
  ],
  entryComponents: [
    UpdateClassComponent,
    DeleteClassRoomComponent
  ],
  providers:[NgbActiveModal]
})
export class ClassRoomModule {
}
