import { Injectable } from '@angular/core';
import { environment as env } from '../../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagedResultDto } from '../model/dtos';
import { IdentityRoleDto, UserItem, UserSaveRequest } from '../model/identity';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private resourceUrl = env.API_GATEWAY_ENDPOINT;
  constructor(private http: HttpClient) { }


  // getUsers(Filter: any, Sorting: any, SkipCount: number, MaxResultCount: number): Observable<PagedResultDto<UserItem>>{
  //   return this.http.get<PagedResultDto<UserItem>>(this.resourceUrl + `identity/users/${Filter}/${Sorting}/${SkipCount}/${MaxResultCount}`); 
  // }
  getUsers(Filter: any, Sorting: any, SkipCount: number, MaxResultCount: number): Observable<PagedResultDto<UserItem>> {
    return this.http.get<PagedResultDto<UserItem>>(this.resourceUrl + 'identity/users?Filter=' + Filter + '&Sorting=' + Sorting + '&SkipCount=' + SkipCount + '&MaxResultCount=' + MaxResultCount)
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(this.resourceUrl + `identity/users/${id}`);
  }

  createUser(body: UserSaveRequest): Observable<UserItem> {
    return this.http.post<UserItem>(this.resourceUrl + 'identity/users', body);
  }

  updateUser(body: { password: any; phoneNumber: any; id: any; userName: any; concurrencyStamp: any; email: any }): Observable<void> {
    return this.http.put<void>(this.resourceUrl + `identity/users/${body.id}`, body);
  }

  //role user
  getAllRoleUser(): Observable<any> {
    return this.http.get<any>(this.resourceUrl + `identity/users/assignable-roles`);
  }

  getRoleUser(id: string): Observable<any> {
    return this.http.get<void>(this.resourceUrl + `identity/users/${id}/roles`);
  }

  putRoleUser(id: string, input: any): Observable<any> {
    return this.http.put<void>(this.resourceUrl + `identity/users/${id}/roles`, input);
  }

  // ldk
  updateLockoutEnabled(id: string, input:boolean):Observable<any>{
    return this.http.put<void>(this.resourceUrl+`identity/users/set-active/${id}`+`?isActive=${input}`, id);
  }
  // ldk
  ResetPassword(id: string):Observable<any>{
    return this.http.put<void>(this.resourceUrl+`identity/users/reset-password/${id}`, id);
  }

}
