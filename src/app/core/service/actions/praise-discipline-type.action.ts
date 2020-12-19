
import {PraiseDisciplineTypeModel} from '../model/praise-discipline-type.model';

export class GetAllPD {
  static readonly type = '[PraiseDisciplineTypeModel] Get All ConcurrentWorkType'
}
export class PostPD {
  static readonly type = '[PraiseDisciplineTypeModel] Post PraiseDisciplineType'
  constructor(public praiseDisciplineTypeModel: PraiseDisciplineTypeModel) {
  }
}
export class DeletePD{
  static readonly type = '[PraiseDisciplineTypeModel] Delete PraiseDisciplineType'
  constructor(public id: string) {
  }
}
export class PutPD{
  static readonly type = '[PraiseDisciplineTypeModel] Put PraiseDisciplineType'
  constructor(public id: string, public praiseDisciplineTypeModel: PraiseDisciplineTypeModel) {
  }
}
export class DeleteListPD{
  static readonly type = '[PraiseDisciplineTypeModel] Delete List PraiseDisciplineType'
  constructor(public ids: string[]) {
  }
}
export class GetPaginationPD{
  static readonly type = '[PraiseDisciplineTypeModel] Pagination PraiseDisciplineType'
  constructor(public keyword: string, public loaiKhenThuongKyLuat: number, public pageSize: number, public skip: number) {
  }
}
