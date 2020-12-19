
import {RewardFinalModel} from '../model/reward-final.model';

export class GetAllRF {
  static readonly type = '[RewardFinalModel] Get All RewardFinal'
}
export class PostRF {
  static readonly type = '[RewardFinalModel] Post RewardFinal'
  constructor(public rewardFinalModel: RewardFinalModel) {
  }
}
export class DeleteRF{
  static readonly type = '[RewardFinalModel] Delete RewardFinal'
  constructor(public id: string) {
  }
}
export class PutRF{
  static readonly type = '[RewardFinalModel] Put RewardFinal'
  constructor(public id: string, public rewardFinalModel: RewardFinalModel) {
  }
}
export class DeleteListRF{
  static readonly type = '[RewardFinalModel] Delete List RewardFinal'
  constructor(public ids: string[]) {
  }
}
export class GetPaginationRF{
  static readonly type = '[RewardFinalModel] Pagination RewardFinal'
  constructor(public keyword: string, public pageSize: number, public skip: number) {
  }
}
export class SetRF{
  static readonly type = '[RewardFinalModel] Set'
  constructor(public rewardFinalModel: RewardFinalModel) {
  }
}
