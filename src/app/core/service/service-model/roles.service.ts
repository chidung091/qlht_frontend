import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ItemRole, Roles} from "../../../views/pages/system/role-management/model/Roles";
import {Observable} from "rxjs";
import {ComparisonOperator, FilterItems, GridParam} from "../model/grid-param";


@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private API = `${environment.API_GATEWAY_ENDPOINT}identity`;
  private inforFind: GridParam;

  constructor(private http: HttpClient) {
  }

  fetchRoles() {
    return this.http.get<any>(`${this.API}/roles/all`);
  }

  deleteRole(id: string) {
    return this.http.delete(`${this.API}/roles/${id}`);
  }

  addRole(payload: Roles) {
    return this.http.post<Roles>('${this.API}/roles', payload);
  }

  updateRole(payload: Roles, id: string) {
    return this.http.put<Roles>(`${this.API}/roles/${id}`, payload);
  }

  deleteList(payload: string[]) {
    return this.http.post<Roles>(`${this.API}/roles/deletes`, payload);
  }

  search(Keyword: string): Observable<ItemRole> {
    if(Keyword === undefined){
      Keyword = '';
    }
    this.inforFind = new GridParam(); // khởi tạo ra biến để
    //this.inforFind.sort = 'creationtime'; // sắp xếp tgian tạo
    // this.inforFind.sortDirection = SortDirection.DESC; //sắp xếp tgian giảm dần
    this.inforFind.filterItems = []; // mảng thuọc tính
    this.inforFind.filterItems.push({
      value: Keyword,
      propertyName: 'description',
      comparison: ComparisonOperator.Contains
    }as FilterItems);
    //this.inforFind.skipCount = skip; // next trang
    //this.inforFind.maxResultCount = pageSize; // so lg max
    return this.http.post<ItemRole>(`${this.API}/roles/phan-trang`, this.inforFind);
  }
}
