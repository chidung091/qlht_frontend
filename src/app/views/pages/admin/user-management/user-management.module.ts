import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { RoleListComponent } from './roles/role-list/role-list.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { PartialsModule } from 'src/app/views/partials/partials.module';
import { NgbModalModule, NgbModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { AddEditRoleComponent } from './roles/add-edit-role/add-edit-role.component';
import { SettingRoleComponent } from './roles/setting-role/setting-role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteRolesComponent } from './roles/delete-roles/delete-roles.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AddEditUserComponent } from './users/add-edit-user/add-edit-user.component';
import { DeleteUserComponent } from './users/delete-user/delete-user.component';
import { RoleSettingComponent } from './users/role-setting/role-setting.component';
import { UploadFileModule } from 'src/app/views/upload-file/upload-file.module';
import { SharedModule } from 'src/app/views/shared/shared.module';
import { OrderModule } from 'ngx-order-pipe';
import { LockoutEnabledComponent } from './users/lockout-enabled/lockout-enabled.component';
import { ResetPassComponent } from './users/reset-pass/reset-pass.component';

@NgModule({
  declarations: [
    UserManagementComponent,
    RoleListComponent,
    UserListComponent,
    AddEditRoleComponent,
    SettingRoleComponent,
    DeleteRolesComponent,
    AddEditUserComponent,
    DeleteUserComponent,
    RoleSettingComponent,
    LockoutEnabledComponent,
    ResetPassComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbProgressbarModule,
    PartialsModule,
    UserManagementRoutingModule,
    SharedModule,
    GridModule,
    DropDownsModule,
    ButtonModule,
    NgbModalModule,
    NgxSpinnerModule,
    UploadFileModule,
    OrderModule,
  ],
  entryComponents: [
    AddEditRoleComponent,
    SettingRoleComponent,
    DeleteRolesComponent,
    AddEditUserComponent,
    DeleteUserComponent,
    RoleSettingComponent
  ]
})
export class UserManagementModule { }
