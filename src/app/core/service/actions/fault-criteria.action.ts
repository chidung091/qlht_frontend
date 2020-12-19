import {FaultCriteriaModel} from '../model/fault-criteria.model';

export class GetAllFault {
  static readonly type = '[FaultCriteriaModel] Get All FaultCriteria'
}
export class PostFault {
  static readonly type = '[FaultCriteriaModel] Post FaultCriteria'
  constructor(public faultCriteriaModel: FaultCriteriaModel) {
  }
}
export class DeleteFault{
  static readonly type = '[FaultCriteriaModel] Delete FaultCriteria'
  constructor(public id: string) {
  }
}
export class PutFault{
  static readonly type = '[FaultCriteriaModel] Put FaultCriteria'
  constructor(public id: string, public faultCriteriaModel: FaultCriteriaModel) {
  }
}
export class DeleteListFault{
  static readonly type = '[FaultCriteriaModel] Delete List FaultCriteria'
  constructor(public ids: string[]) {
  }
}
export class GetPaginationFault{
  static readonly type = '[FaultCriteriaModel] Pagination FaultCriteria'
  constructor(public keyword: string, public nameManagement: string, public pageSize: number, public skip: number) {
  }
}
