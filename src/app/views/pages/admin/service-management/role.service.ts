import { Injectable } from '@angular/core';
import { environment as env } from '../../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetPermissionListResultDto, UpdatePermissionsDto } from '../model/roles';
import { PagedResultDto } from '../model/dtos';
import { IdentityRoleCreateOrUpdateDto, IdentityRoleDto } from '../model/identity';
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private resourceUrl = env.API_GATEWAY_ENDPOINT;
  constructor(private http: HttpClient) { }

  getAllRole(Filter: any, Sorting: any, SkipCount: number, MaxResultCount: number): Observable<PagedResultDto<IdentityRoleDto>> {
    return this.http.get<PagedResultDto<IdentityRoleDto>>(this.resourceUrl + 'identity/roles/all?Filter=' + Filter + '&Sorting=' + Sorting + '&SkipCount=' + SkipCount + '&MaxResultCount=' + MaxResultCount)
  }

  getAllParent(): Observable<any> {
    return this.http.get<any>(this.resourceUrl + `identity/roles/assignable-parent`);
  }

  update(id: string, input: IdentityRoleCreateOrUpdateDto): Observable<void> {
    return this.http.put<void>(this.resourceUrl + `identity/roles/${id}`, input);
  }

  create(body: IdentityRoleCreateOrUpdateDto): Observable<IdentityRoleDto> {
    return this.http.post<IdentityRoleDto>(
      this.resourceUrl + 'identity/roles',
      body
    );
  }

  DeleteMultiple(input): Observable<any> {
    return this.http.post<void>(this.resourceUrl + `identity/roles/deletes`, input);
  }

  // Phân quyền
  getPermiss(providerName: string, providerKey: string): Observable<GetPermissionListResultDto> {
    const params = new HttpParams().set('providerName', providerName).set('providerKey', providerKey);
    return this.http.get<GetPermissionListResultDto>(this.resourceUrl + 'permission-management/permissions', { params });
  }

}
