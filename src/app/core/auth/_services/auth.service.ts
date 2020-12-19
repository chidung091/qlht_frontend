import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user.model';
import { Permission } from '../_models/permission.model';
import { Role } from '../_models/role.model';
import { catchError, map } from 'rxjs/operators';
import { QueryParamsModel, QueryResultsModel } from '../../_base/crud';
import { environment as env } from '../../../../environments/environment';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../../_config/auth.config';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';

const API_USERS_URL = env.API_GATEWAY_ENDPOINT + 'identity/users';
const API_PERMISSION_URL = 'api/permissions';
const API_ROLES_URL = 'api/roles';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private oAuthService: OAuthService) {
    // this.loadConfig();
  }

  // private loadConfig() {
  //   this.oAuthService.configure(authConfig);
  //   this.oAuthService.setStorage(sessionStorage);
  //   this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
  //   this.oAuthService.loadDiscoveryDocumentAndTryLogin();

  //   // Optional
  //   this.oAuthService.setupAutomaticSilentRefresh();
  // }

  async login(username: string, password: string): Promise<any> {
    // return of(
    //   this.oAuthService.fetchTokenUsingPasswordFlow(username, password)
    // ).pipe(
    //   map((res) => {
    //     return res;
    //   }),
    //   catchError((err) => {
    //     return null;
    //   })
    // );
    return await this.oAuthService.fetchTokenUsingPasswordFlow(username, password);
  }

  get isAuthorized(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  logoff() {
    this.oAuthService.logOut();
  }

  currentUser(): Observable<any> {
    return of(this.oAuthService.loadUserProfile());
  }

  getUserByToken(): Observable<User> {
    const token = this.oAuthService.getAccessToken();
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + token);
    return this.http.get<User>(env.API_GATEWAY_ENDPOINT + 'identity/my-profile', { headers: httpHeaders });
  }

  register(user: User): Observable<any> {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    return this.http
      .post<User>(API_USERS_URL, user, { headers: httpHeaders })
      .pipe(
        map((res: User) => {
          return res;
        }),
        catchError((err) => {
          return null;
        })
      );
  }

  /*
   * Submit forgot password request
   *
   * @param {string} email
   * @returns {Observable<any>}
   */
  public requestPassword(email: string): Observable<any> {
    return this.http
      .get(API_USERS_URL + '/forgot?=' + email)
      .pipe(catchError(this.handleError('forgot-password', [])));
  }

  changePassword(current:string, newPass:string): Observable<any> {

    return this.http.put(env.API_GATEWAY_ENDPOINT + 'identity/users/change-password?currentPassword='+current+'&newPassword='+newPass,null);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_USERS_URL);
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(API_USERS_URL + `/${userId}`);
  }

  // DELETE => delete the user from the server
  deleteUser(userId: number) {
    const url = `${API_USERS_URL}/${userId}`;
    return this.http.delete(url);
  }

  // UPDATE => PUT: update the user on the server
  // tslint:disable-next-line
  updateUser(_user: User): Observable<any> {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    return this.http.put(API_USERS_URL, _user, { headers: httpHeaders });
  }

  // CREATE =>  POST: add a new user to the server
  createUser(user: User): Observable<User> {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<User>(API_USERS_URL, user, { headers: httpHeaders });
  }

  // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
  // items => filtered/sorted result
  findUsers(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    let httpHeaders = new HttpHeaders();
    let params = new HttpParams().set('SkipCount', '0').set('MaxResultCount', '10');
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    return this.http.get<QueryResultsModel>(
      API_USERS_URL,
      { headers: httpHeaders , params: params}
    );
  }

  // Permission
  getAllPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(API_PERMISSION_URL);
  }

  getRolePermissions(roleId: number): Observable<Permission[]> {
    return this.http.get<Permission[]>(
      API_PERMISSION_URL + '/getRolePermission?=' + roleId
    );
  }

  // Roles
  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(API_ROLES_URL);
  }

  getRoleById(roleId: number): Observable<Role> {
    return this.http.get<Role>(API_ROLES_URL + `/${roleId}`);
  }

  // CREATE =>  POST: add a new role to the server
  createRole(role: Role): Observable<Role> {
    // Note: Add headers if needed (tokens/bearer)
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<Role>(API_ROLES_URL, role, { headers: httpHeaders });
  }

  // UPDATE => PUT: update the role on the server
  updateRole(role: Role): Observable<any> {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    return this.http.put(API_ROLES_URL, role, { headers: httpHeaders });
  }

  // DELETE => delete the role from the server
  deleteRole(roleId: number): Observable<Role> {
    const url = `${API_ROLES_URL}/${roleId}`;
    return this.http.delete<Role>(url);
  }

  // Check Role Before deletion
  isRoleAssignedToUsers(roleId: number): Observable<boolean> {
    return this.http.get<boolean>(
      API_ROLES_URL + '/checkIsRollAssignedToUser?roleId=' + roleId
    );
  }

  findRoles(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    // This code imitates server calls
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<QueryResultsModel>(
      API_ROLES_URL + '/findRoles',
      queryParams,
      { headers: httpHeaders }
    );
  }

  /*
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }
}
