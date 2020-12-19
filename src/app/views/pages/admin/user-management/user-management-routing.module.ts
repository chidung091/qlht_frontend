import { ResetPassComponent } from './users/reset-pass/reset-pass.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { PermissionGuard } from 'src/app/core/auth';
import { Policies } from 'src/app/core/_constants/policy.constants';
import { RoleListComponent } from './roles/role-list/role-list.component';
import { LockoutEnabledComponent } from './users/lockout-enabled/lockout-enabled.component';
import { UserListComponent } from './users/user-list/user-list.component';

const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: Policies.ABPIDENTITY_USERS,
        // redirectTo: 'access-denied',
      },
    },
  },
  {
    path: 'roles',
    component: RoleListComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: Policies.ABPIDENTITY_ROLES,
        // redirectTo: 'access-denied',
      },
    },
  },
  {
    path: 'lockout',
    component: LockoutEnabledComponent,
    canActivate:[NgxPermissionsGuard],
    data: {
      permissions: {
        only: Policies.ABPIDENTITY_USERS_LOCKOUT,
        // redirectTo: 'access-denied',
      },
    }
  },
  {
    path: 'lockout',
    component: ResetPassComponent,
    canActivate:[NgxPermissionsGuard],
    data: {
      permissions: {
        only: Policies.ABPIDENTITY_USERS_RESET,
        // redirectTo: 'access-denied',
      },
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule {}
