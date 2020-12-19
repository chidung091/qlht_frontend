import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {GroupFaultCriteriaTypeModel} from '../model/group-fault-criteria-type.model.';

@Injectable({
  providedIn: 'root'
})
export class GroupFaultCriteriaTypeService {
  private API = `${environment.API_GATEWAY_ENDPOINT}`;
  constructor(private http: HttpClient) { }
  getAllGroupFault(){
    return this.http.get<GroupFaultCriteriaTypeModel[]>(`${this.API}danh-muc-truong/nhom-loi-vi-pham/tat-ca`)
  }
}
