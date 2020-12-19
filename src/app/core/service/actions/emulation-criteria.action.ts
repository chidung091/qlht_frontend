
import {EmulationCriteriaModel} from '../model/emulation-criteria.model';

export class GetAllEmu {
  static readonly type = '[ItemEmulationCriteriaModel] Get All Emulationcriteria'
}
export class PostEmu {
  static readonly type = '[EmulationCriteriaModel] Post Emulationcriteria'
  constructor(public emulationCriteriaModel: EmulationCriteriaModel) {
  }
}
export class DeleteEmu{
  static readonly type = '[EmulationCriteriaModel] Delete EmulationCriteria'
  constructor(public id: string) {
  }
}
export class PutEmu{
  static readonly type = '[EmulationCriteriaModel] Put EmulationCriteria'
  constructor(public id: string, public emulationCriteriaModel: EmulationCriteriaModel) {
  }
}
export class DeleteListEmu{
  static readonly type = '[EmulationCriteriaModel] Delete List EmulationCriteria'
  constructor(public ids: string[]) {
  }
}
export class GetPaginationEmu{
  static readonly type = '[EmulationCriteriaModel] Pagination EmulationCriteria'
  constructor(public keyword: string, public pageSize: number, public skip: number) {
  }
}
