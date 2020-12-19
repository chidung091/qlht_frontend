import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { authConfig } from '../../../../core/_config/auth.config';

@Injectable({
  providedIn: 'root',
})
export class OAuthConfigurationHandler {
  constructor(private oAuthService: OAuthService){
    this.loadConfig();
  }

  private async loadConfig() {
    this.oAuthService.configure(authConfig);
    this.oAuthService.setStorage(sessionStorage);
    this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
    // Optional
    this.oAuthService.setupAutomaticSilentRefresh();
  }
}
