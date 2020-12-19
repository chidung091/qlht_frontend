// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  isMockEnabled: true, // You have to switch this, when your real back-end is done
  authTokenKey: 'authce9d77b308c149d5992a80073637e4d5',
  AUTH_SERVER: 'http://103.226.248.209:64999',
  API_GATEWAY_ENDPOINT: 'http://103.226.248.209:65115/api/',
  RESOURCE_NAME: 'openid profile offline_access IdentityService TenantManagementService InternalGateway BackendAdminAppGateway EmployeeManagementService CategoryManagementService SmasCustomerService AdminSettingManagementService SettingManagementService ClassroomSupervisorService'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
