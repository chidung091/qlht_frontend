export interface IdentityRoleDto {
    name: string;
    isDefault: boolean;
    isStatic: boolean;
    isPublic: boolean;
    concurrencyStamp: string;
  }
  
  export interface IdentityUserDto {
    tenantId?: string;
    userName: string;
    name: string;
    surname: string;
    email: string;
    emailConfirmed: boolean;
    phoneNumber: string;
    phoneNumberConfirmed: boolean;
    lockoutEnabled: boolean;
    lockoutEnd?: string;
    concurrencyStamp: string;
  }
  
  export interface IdentityRoleCreateOrUpdateDto {
    name: string;
    isDefault: boolean;
    isPublic: boolean;
  }
  
  export interface UserItem extends User {
    tenantId: string;
    emailConfirmed: boolean;
    phoneNumberConfirmed: boolean;
    isLockedOut: boolean;
    concurrencyStamp: string;
    id: string;
    password: string;
  }
  
  export interface User {
    fullName: string;
    userName: string;
    email: string;
    phoneNumber?: string;
    twoFactorEnabled?: true;
    lockoutEnabled?: true;
  }
  
  export interface RoleSaveRequest {
    name: string;
    isDefault: boolean;
    isPublic: boolean;
  }
  export interface RoleItem extends RoleSaveRequest {
    isStatic: boolean;
    concurrencyStamp: string;
    id: string;
  }
  
  export interface UserSaveRequest extends User {
    password: string;
    roleNames?: string[];
  }
  
  // role trường học
  
  export interface RoleBase{
    name: string,
    isDefault: true,
    isStatic: true,
    isPublic: true,
    concurrencyStamp: string,
    remark: string,
    description: string,
    isActive: true,
    isAdminRole: true,
    id: string,
    extraProperties: {
      additionalProp1: {},
      additionalProp2: {},
      additionalProp3: {}
    },
    value: boolean
  }