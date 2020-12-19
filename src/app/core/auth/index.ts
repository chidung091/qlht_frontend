// SERVICES
export { AuthService } from './_services';
export { AuthNoticeService } from './auth-notice/auth-notice.service';

// DATA SOURCERS
export { RolesDataSource } from './_data-sources/roles.datasource';
export { UsersDataSource } from './_data-sources/users.datasource';

// ACTIONS
export {
    Login,
    Logout,
    Register,
    UserRequested,
    UserLoaded,
    AuthActionTypes,
    AuthActions
} from './_actions/auth.actions';
export {
    AllPermissionsRequested,
    AllPermissionsLoaded,
    PermissionActionTypes,
    PermissionActions
} from './_actions/permission.actions';
export {
    RoleOnServerCreated,
    RoleCreated,
    RoleUpdated,
    RoleDeleted,
    RolesPageRequested,
    RolesPageLoaded,
    RolesPageCancelled,
    AllRolesLoaded,
    AllRolesRequested,
    RoleActionTypes,
    RoleActions
} from './_actions/role.actions';
export {
    UserCreated,
    UserUpdated,
    UserDeleted,
    UserOnServerCreated,
    UsersPageLoaded,
    UsersPageCancelled,
    UsersPageToggleLoading,
    UsersPageRequested,
    UsersActionToggleLoading
} from './_actions/user.actions';

export * from './_actions/tenant.actions'

// EFFECTS
export { AuthEffects } from './_effects/auth.effects';
export { PermissionEffects } from './_effects/permission.effects';
export { RoleEffects } from './_effects/role.effects';
export { UserEffects } from './_effects/user.effects';
export { TenantEffects } from './_effects/tenant.effects';
export { ConfigEffects } from './_effects/config.effects';

// REDUCERS
export { authReducer } from './_reducers/auth.reducers';
export { permissionsReducer } from './_reducers/permission.reducers';
export { rolesReducer } from './_reducers/role.reducers';
export { usersReducer } from './_reducers/user.reducers';
export { tenantReducer } from './_reducers/tenant.reducers';
export { configReducer } from './_reducers/config.reducers';

// SELECTORS
export {
    isLoggedIn,
    isLoggedOut,
    isUserLoaded,
    currentAuthToken,
    currentUser,
    currentUserRoleIds,
    currentUserPermissionsIds,
    currentUserPermissions,
    checkHasUserPermission
} from './_selectors/auth.selectors';
export {
    selectPermissionById,
    selectAllPermissions,
    selectAllPermissionsIds,
    allPermissionsLoaded
} from './_selectors/permission.selectors';
export {
    selectRoleById,
    selectAllRoles,
    selectAllRolesIds,
    allRolesLoaded,
    selectLastCreatedRoleId,
    selectRolesPageLoading,
    selectQueryResult,
    selectRolesActionLoading,
    selectRolesShowInitWaitingMessage
} from './_selectors/role.selectors';
export {
    selectUserById,
    selectUsersPageLoading,
    selectLastCreatedUserId,
    selectUsersInStore,
    selectHasUsersInStore,
    selectUsersPageLastQuery,
    selectUsersActionLoading,
    selectUsersShowInitWaitingMessage
} from './_selectors/user.selectors';

export { isTenantLoaded, currentTenant, selectSchoolLevels} from './_selectors/tenant.selectors';
export { isConfigLoaded, currentConfig} from './_selectors/config.selectors';

// GUARDS
export { AuthGuard } from './_guards/auth.guard';
export { ModuleGuard } from './_guards/module.guard';
export { PermissionGuard } from './_guards/permission.guard';
export { RoleGuard } from './_guards/role.guard';

// MODELS
export { User } from './_models/user.model';
export { Permission } from './_models/permission.model';
export { Role } from './_models/role.model';
export { Address } from './_models/address.model';
export { SocialNetworks } from './_models/social-networks.model';
export { AuthNotice } from './auth-notice/auth-notice.interface';

export { TenantInfo } from './_models/tenant.model';

export { AuthDataContext } from './_server/auth.data-context';

export { ConfigResponse } from './_models/config.model';
