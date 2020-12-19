import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class UploadFile {

    private resourceUrl = env.API_GATEWAY_ENDPOINT;
    constructor(private http: HttpClient) { }

    UploadFileSChool(input: any): Observable<any> {
        return this.http.post(  this.resourceUrl + 'multi-tenancy/tenants/school-image-upload', input,
        {
            responseType: 'text'
        });
    }

}
