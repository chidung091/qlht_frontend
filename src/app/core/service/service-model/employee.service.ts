import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Employee} from '../model/Employee';
import {Observable} from "rxjs";
import {EmployeeProfileModel} from '../model/Employee-profile';
import {ComparisonOperator, FilterItems, GridParam, SortDirection} from '../model/grid-param';
import {ItemEmployeeModel} from '../model/item-employee.model';
import {empty} from 'rxjs/internal/Observer';

export class DataSearch{
  trainingLevelCode: string;
  gridParam: GridParam;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private API = `${environment.API_GATEWAY_ENDPOINT}`;
  private gridParam: GridParam;
  constructor(private http: HttpClient) { }

  getEmployeeByFacultyId(facultyId: string) {
    return this.http.get<EmployeeProfileModel[]>(`${this.API}can-bo/lay-can-bo-to-bo-mon/${facultyId}`);
  }
  getAllEmployee() : Observable<EmployeeProfileModel[]>{
    return this.http.get<EmployeeProfileModel[]>(`${this.API}can-bo/tat-ca`);
  }

  getDataSubding(dataSearchToBoMon: string, dataSearchCongViec: string, dataSearchTrangThai: string, dataSearchGioiTinh: string,
                 dataSearchHTHD: string, trainingLevelCode: string, dataSearchMaCanBo: string, dataSearchTenCanBo: string,
                 dataSearchNgaySinh: string,maxResultCount: number, skipCount: number): Observable<ItemEmployeeModel> {

    this.gridParam = new GridParam();
    this.gridParam.filterItems = [];

    if (dataSearchToBoMon != null && dataSearchToBoMon !== '') {
      this.gridParam.filterItems.push({
        value: dataSearchToBoMon,
        propertyName: 'schoolFacultyID',
        comparison: ComparisonOperator.Equal
      } as FilterItems)
    }
    if (dataSearchCongViec != null && dataSearchCongViec !== '') {
      this.gridParam.filterItems.push({
        value: dataSearchCongViec,
        propertyName: 'positionGroupCode',
        comparison: ComparisonOperator.Equal
      } as FilterItems)
    } if (dataSearchTrangThai != null && dataSearchTrangThai !== '') {
      this.gridParam.filterItems.push({
        value: dataSearchTrangThai,
        propertyName: 'status',
        comparison: ComparisonOperator.Equal
      } as FilterItems)
    } if (dataSearchGioiTinh != null && dataSearchGioiTinh !== '') {
      this.gridParam.filterItems.push({
        value: dataSearchGioiTinh,
        propertyName: 'SexCode',
        comparison: ComparisonOperator.Equal
      } as FilterItems)
    } if (dataSearchHTHD != null && dataSearchHTHD !== '') {
      this.gridParam.filterItems.push({
        value: dataSearchHTHD,
        propertyName: 'contractType',
        comparison: ComparisonOperator.Equal
      } as FilterItems)
    } if (dataSearchMaCanBo != null && dataSearchMaCanBo !== '') {
      this.gridParam.filterItems.push({
        value: dataSearchMaCanBo,
        propertyName: 'code',
        comparison: ComparisonOperator.Contains
      } as FilterItems)
    } if (dataSearchTenCanBo != null && dataSearchTenCanBo !== '') {
      this.gridParam.filterItems.push({
        value: dataSearchTenCanBo,
        propertyName: 'fullName',
        comparison: ComparisonOperator.Contains
      } as FilterItems)
    } if (dataSearchNgaySinh != null && dataSearchNgaySinh !== '') {
      this.gridParam.filterItems.push({
        value: dataSearchNgaySinh,
        propertyName: 'birthDate',
        comparison: ComparisonOperator.Equal
      } as FilterItems)
    }
    this.gridParam.skipCount = skipCount;
    this.gridParam.sort = 'creationTime';
    this.gridParam.maxResultCount = maxResultCount;
    const dataSerch = new DataSearch();
    if (trainingLevelCode != null && trainingLevelCode !== '') {
      dataSerch.trainingLevelCode = trainingLevelCode;
    }
    dataSerch.gridParam = this.gridParam;
    return this.http.post<ItemEmployeeModel>(`${this.API}can-bo/phan-trang`, dataSerch);
  }

  deleteEmployee(id: string): Observable<EmployeeProfileModel>{
    return this.http.delete<EmployeeProfileModel>(`${this.API}can-bo/xoa/${id}`);
  }

  getEmployeeByID(id: string) {
    return this.http.get<EmployeeProfileModel>(`${this.API}can-bo/${id}`);
  }

  deleteManyEmployee(ids: string[]): void{
  }
}
