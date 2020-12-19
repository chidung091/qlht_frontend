import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { environment as env } from '../../../../environments/environment';

@Injectable()
export class UploadFileService {
  private resourceUrl = env.API_GATEWAY_ENDPOINT;

  constructor(private http: HttpClient) {}

  public uploadFile(file: File): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    // formData.append('files', file, file.name);
    formData.append('image', file, file.name);

    const options = {
      reportProgress: true,
    };

    const req = new HttpRequest(
      'POST',
      `${this.resourceUrl}multi-tenancy/tenants/school-image-upload`,
      formData,
      options
    );
    return this.http.request(req);
  }
}
