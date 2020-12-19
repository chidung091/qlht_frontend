// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './views/theme/base/base.component';
// Auth
import { AuthGuard } from './_helpers/auth.guard';
import {EmployeeComponent} from './employee/employee.component';
import {MedicineComponent} from './medicine/medicine.component';
import {LoginComponent} from './login/login.component';

// const routes: Routes = [
//   {
//     path: 'auth',
//     loadChildren: () =>
//       import('./views/pages/auth/auth.module').then((m) => m.AuthModule),
//   },
//   {
//     path: 'error',
//     loadChildren: () =>
//       import('./views/pages/error/error.module').then((m) => m.ErrorModule),
//   },
//   {
//     path: 'access-denied',
//     loadChildren: () =>
//       import('./views/pages/access-denied/access-denied.module').then(
//         (m) => m.AccessDeniedModule
//       ),
//   },
//   {
//     path: 'level-selector',
//     canActivate: [AuthGuard],
//     loadChildren: () =>
//       import('./views/pages/level-school/level-school.module').then(
//         (m) => m.LevelSchoolModule
//       ),
//   },
//   {
//     path: '',
//     component: BaseComponent,
//     canActivate: [AuthGuard],
//     children: [
//       {
//         path: '',
//         loadChildren: () =>
//           import('./views/pages/dashboard/dashboard.module').then(
//             (m) => m.DashboardModule
//           ),
//       },
//       {
//         path: 'admin',
//         loadChildren: () =>
//           import('./views/pages/admin/admin.module').then((m) => m.AdminModule),
//       },
//       {
//         path: 'students',
//         loadChildren: () =>
//           import('./views/pages/students/students.module').then(
//             (m) => m.StudentsModule
//           ),
//       },
//       {
//         path: 'system',
//         loadChildren: () =>
//           import('./views/pages/system/system.module').then(
//             (m) => m.SystemModule
//           ),
//       },
//       {
//         path: 'categories',
//         loadChildren: () =>
//           import('./views/pages/categories/categories.module').then(
//             (m) => m.CategoriesModule
//           ),
//       },
//       {
//         path: 'officers',
//         loadChildren: () =>
//           import('./views/pages/officers/officers.module').then(
//             (m) => m.OfficersModule
//           ),
//       },
//       { path: '**', redirectTo: '', pathMatch: 'full' },
//     ],
//   },
//   { path: '', redirectTo: '', pathMatch: 'full' },
//   { path: '**', redirectTo: 'error/403', pathMatch: 'full' },
// ];

const routes: Routes = [
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'employee', component: EmployeeComponent},
      // {
      //   path: 'admin',
      //   loadChildren: () =>
      //     import('./views/pages/admin/admin.module').then((m) => m.AdminModule),
      // },
      {path: 'medicine', component: MedicineComponent},
      {
        path: 'students',
        loadChildren: () =>
          import('./views/pages/students/students.module').then(
            (m) => m.StudentsModule
          ),
      },
      // {
      //   path: 'system',
      //   loadChildren: () =>
      //     import('./views/pages/system/system.module').then(
      //       (m) => m.SystemModule
      //     ),
      // },
      // {
      //   path: 'categories',
      //   loadChildren: () =>
      //     import('./views/pages/categories/categories.module').then(
      //       (m) => m.CategoriesModule
      //     ),
      // },
      // {
      //   path: 'officers',
      //   loadChildren: () =>
      //     import('./views/pages/officers/officers.module').then(
      //       (m) => m.OfficersModule
      //     ),
      // },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
