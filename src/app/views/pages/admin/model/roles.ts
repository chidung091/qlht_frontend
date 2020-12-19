export interface Roles {
    id?:string;
    name?: string;
    description?: string;
    remark?: string;
    active?: boolean;
    isDefault?: boolean;
    isStatic?: boolean;
    isPublic?: boolean;
    concurrencyStamp?: string;
  }
  export  class ItemRole{
    totalCount: number;
    items: Roles[];
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
  
  export interface GetPermissionListResultDto {
    entityDisplayName: string;
    groups: PermissionGroupDto[];
  }
  
  export interface UpdatePermissionsDto {
    permissions: UpdatePermissionDto[];
  }
  
  export interface PermissionGroupDto {
    name: string;
    displayName: string;
    permissions: PermissionGrantInfoDto[];
  }
  
  export interface UpdatePermissionDto {
    name: string;
    isGranted: boolean;
  }
  
  export interface PermissionGrantInfoDto {
    name: string;
    displayName: string;
    parentName: string;
    isGranted: boolean;
    allowedProviders: string[];
    grantedProviders: ProviderInfoDto[];
  }
  export interface ProviderInfoDto {
    providerName: string;
    providerKey: string;
  }