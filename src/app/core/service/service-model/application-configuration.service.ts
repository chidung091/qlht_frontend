import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationConfiguration } from '../model';
import { HttpClient } from '@angular/common/http';
import {environment as env} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApplicationConfigurationService {

    constructor(private http: HttpClient) {}

    getConfiguration(): Observable<ApplicationConfiguration.Response> {
        return this.http.get<ApplicationConfiguration.Response>(env.API_GATEWAY_ENDPOINT + 'abp/application-configuration');
    }
}
