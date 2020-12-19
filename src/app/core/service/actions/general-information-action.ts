import {TenantModel} from '../model/tenant.model';


export class GeneralInformationAction {
  static readonly type = '[GeneralInformation] Get all school information'
  constructor(public schoolId: string) {
  }
}

export class GeneralInformationUpdate {
  static readonly type = '[GeneralInformation] Cap nhat thong tin cua mot truong'
  constructor(public schoolId: string, public payload: TenantModel) {
  }
}
