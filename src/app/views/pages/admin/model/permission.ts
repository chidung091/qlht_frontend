import { EventEmitter } from '@angular/core';

export interface PermissionResponse {
  entityDisplayName: string;
  groups: Group[];
}

export interface Group {
  name: string;
  displayName: string;
  permissions: Permission[];
}

export interface MinimumPermission {
  name: string;
  isGranted: boolean;
}

export interface Permission extends MinimumPermission {
  displayName: string;
  parentName: string;
  allowedProviders: string[];
  grantedProviders: GrantedProvider[];
}

export interface GrantedProvider {
  providerName: string;
  providerKey: string;
}

export interface UpdateRequest {
  permissions: MinimumPermission[];
}

export interface PermissionManagementComponentInputs {
  visible: boolean;
  readonly providerName: string;
  readonly providerKey: string;
  readonly hideBadges: boolean;
}

export interface PermissionManagementComponentOutputs {
  readonly visibleChange: EventEmitter<boolean>;
}

export interface GetPermissionListResultDto {
  entityDisplayName: string;
  groups: PermissionGroupDto[];
}

export interface PermissionGrantInfoDto {
  name: string;
  displayName: string;
  parentName: string;
  isGranted: boolean;
  allowedProviders: string[];
  grantedProviders: ProviderInfoDto[];
}

export interface PermissionGroupDto {
  name: string;
  displayName: string;
  permissions: PermissionGrantInfoDto[];
}

export interface ProviderInfoDto {
  providerName: string;
  providerKey: string;
}

export interface UpdatePermissionDto {
  name: string;
  isGranted: boolean;
}

export interface UpdatePermissionsDto {
  permissions: UpdatePermissionDto[];
}
