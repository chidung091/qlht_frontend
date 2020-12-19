import { AuthConfig } from 'angular-oauth2-oidc';
import {environment} from '../../../environments/environment';

export const authConfig: AuthConfig = {

    issuer: `${environment.AUTH_SERVER}`,

    redirectUri: window.location.origin,

    silentRefreshRedirectUri: window.location.origin,

    clientId: 'backend-admin-app-client',

    dummyClientSecret: '1q2w3e*',

    scope: `${environment.RESOURCE_NAME}`,

    showDebugInformation: true,

    oidc: false,

    requireHttps: false
}
