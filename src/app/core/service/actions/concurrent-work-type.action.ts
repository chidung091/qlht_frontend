import {ConcurrentWorkTypeModel} from '../model/concurrent-work-type.model';

export class GetAllCon {
  static readonly type = '[ConcurrentWorkTypeModel] Get All ConcurrentWorkType'
}
export class PostCon {
  static readonly type = '[ConcurrentWorkTypeModel] Post ConcurrentWorkType'
  constructor(public concurrentWorkTypeModel: ConcurrentWorkTypeModel) {
  }
}
export class DeleteCon{
  static readonly type = '[ConcurrentWorkTypeModel] Delete ConcurrentWorkType'
  constructor(public id: string) {
  }
}
export class PutCon{
  static readonly type = '[ConcurrentWorkTypeModel] Put ConcurrentWorkType'
  constructor(public id: string, public concurrentWorkTypeModel: ConcurrentWorkTypeModel) {
  }
}
export class DeleteListCon{
  static readonly type = '[ConcurrentWorkTypeModel] Delete List ConcurrentWorkType'
  constructor(public ids: string[]) {
  }
}
export class GetPaginationCon{
  static readonly type = '[ConcurrentWorkTypeModel] Pagination ConcurrentWorkType'
  constructor(public keyword: string, public pageSize: number, public skip: number) {
  }
}
