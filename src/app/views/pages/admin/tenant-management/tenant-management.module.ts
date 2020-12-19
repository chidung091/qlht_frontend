import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantManagementRoutingModule } from './tenant-management-routing.module';
import { TenantManagementComponent } from './tenant-management.component';
import { TenantEditComponent } from './tenants/tenant-edit/tenant-edit.component';


@NgModule({
  declarations: [TenantManagementComponent, TenantEditComponent],
  imports: [
    CommonModule,
    TenantManagementRoutingModule
  ]
})
export class TenantManagementModule { }
