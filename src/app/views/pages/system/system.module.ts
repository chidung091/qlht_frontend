import {NgModule} from '@angular/core';
import {SchoolFacultyComponent} from './school-faculty/school-faculty.component';
import {RouterModule, Routes} from '@angular/router';
import {ClassRoomComponent} from './class-room/class-room.component';
import {SchoolInformationComponent} from './school-information/school-information.component';
import {ClassSubjectComponent} from './class-subject/class-subject.component';
import {NgxsModule} from '@ngxs/store';
import {GeneralInformationState} from '../../../core/service/states/general-information.state';
import {DepartmentState} from '../../../core/service/states/department.state';
import {DistrictState} from '../../../core/service/states/district.state';
import {SchoolInformationState} from '../../../core/service/states/school-information-state';
import {ProvinceState} from '../../../core/service/states/province.state';
import {ManagermentState} from '../../../core/service/states/managerment.state';
import {IdentityUserState} from '../../../core/service/states/identityUser.state';
import {CatalogState} from '../../../core/service/states/catalog.state';
import {WardsState} from '../../../core/service/states/wards.state';
import {ClassroomState} from '../../../core/service/states/classroom.state';
import {GradeState} from '../../../core/service/states/grade.state';
import {SubjectState} from '../../../core/service/states/subject.state';
import {SchoolInformationModule} from './school-information/school-information.module';
import {SchoolYearComponent} from './school-year/school-year.component';
import {UploadFileModule} from '../../upload-file/upload-file.module';
import {DataInitializationModule} from './data-initialization/data-initialization.module';
import {SchoolYearModule} from './school-year/school-year.module';

const routes: Routes = [
  {
    path: 'subject',
    component: ClassSubjectComponent,
  },
  {
    path: 'department',
    component: SchoolFacultyComponent,
  },
  {
    path: 'class-room',
    component: ClassRoomComponent,
  },
  {path: 'school-information', component: SchoolInformationComponent},
  {
    path: 'data-initialization',
    loadChildren: () =>
      import('./data-initialization/data-initialization.module').then(
        (m) => m.DataInitializationModule
      ),
  },
  {
    path: 'school-year',
    component: SchoolYearComponent,
  },
  {path: '', redirectTo: 'school-information', pathMatch: 'full'},
  {path: '**', redirectTo: 'school-information', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    NgxsModule.forFeature([
      GeneralInformationState,
      DepartmentState,
      DistrictState,
      SchoolInformationState,
      ProvinceState,
      ManagermentState,
      IdentityUserState,
      CatalogState,
      WardsState,
      ClassroomState,
      GradeState,
      SubjectState,
    ]),
    UploadFileModule,
    SchoolInformationModule,
    DataInitializationModule,
    SchoolYearModule

  ],
})
export class SystemModule {
}
