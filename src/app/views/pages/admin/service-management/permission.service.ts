import { Injectable } from '@angular/core';
import { environment as env } from '../../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GetPermissionListResultDto, UpdatePermissionsDto } from '../model/permission';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PermissionService {

  private resourceUrl = env.API_GATEWAY_ENDPOINT;
  constructor(private http: HttpClient) {}

  get(providerName: string, providerKey: string): Observable<GetPermissionListResultDto> {
    const params = new HttpParams().set('providerName', providerName).set('providerKey', providerKey);
    return this.http.get<GetPermissionListResultDto>(this.resourceUrl + 'permission-management/permissions', { params });
  }

  getRoleById(id: string): Observable<any>{
    return this.http.get<void>(this.resourceUrl + `identity/roles/${id}`);
  }

  update(providerName: string, providerKey: string, input: UpdatePermissionsDto): Observable<void> {
    const params = new HttpParams().set('providerName', providerName).set('providerKey', providerKey);
    return this.http.put<void>(this.resourceUrl + 'permission-management/permissions', input, {params});
  }

}
