import { Type } from '@angular/core';
import { ApplicationConfiguration } from './application-configuration';

// tslint:disable-next-line: no-namespace
export namespace Config {

//   export type State = ApplicationConfiguration.Response;

    export interface State {
        appConfig: ApplicationConfiguration.Response
    }

  export interface Application {
    name: string;
    baseUrl?: string;
    logoUrl?: string;
  }

  export type ApiConfig = {
    [key: string]: string;
    url: string;
  } & Partial<{
    rootNamespace: string;
  }>;

  export interface Apis {
    [key: string]: ApiConfig;
    default: ApiConfig;
  }

  export interface Requirements {
    layouts: Type<any>[];
  }

  export interface LocalizationWithDefault {
    key: string;
    defaultValue: string;
  }

  export type LocalizationParam = string | LocalizationWithDefault;
}
