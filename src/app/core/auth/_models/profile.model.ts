export class ProfileModel {
  currentTenant: CurrentTenant;
  currentUser: CurrentUser;
}

export interface CurrentTenant {
  id?: string,
  isAvailable: boolean,
  name?: string,
}

export interface CurrentUser {
  email?: string,
  id?: string,
  isAuthenticated: boolean,
  roles?: string[],
  tenantId?: string,
  username?: string
}
