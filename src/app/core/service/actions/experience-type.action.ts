import {ExperienceTypeModel} from '../model/experience-type.model';

export class GetAllExper {
  static readonly type = '[ExperienceTypeModel] Get All ExperienceType'
}
export class PostExper {
  static readonly type = '[ExperienceTypeModel] Post ExperienceType'
  constructor(public experienceTypeModel: ExperienceTypeModel) {
  }
}
export class DeleteExper{
  static readonly type = '[ExperienceTypeModel] Delete ExperienceType'
  constructor(public id: string) {
  }
}
export class PutExper{
  static readonly type = '[ExperienceTypeModel] Put ExperienceType'
  constructor(public id: string, public experienceTypeModel: ExperienceTypeModel) {
  }
}
export class DeleteListExper{
  static readonly type = '[ExperienceTypeModel] Delete List ExperienceType'
  constructor(public ids: string[]) {
  }
}
export class GetPaginationExper{
  static readonly type = '[ExperienceTypeModel] Pagination Exp'
  constructor(public keyword: string, public pageSize: number, public skip: number) {
  }
}

export class SetSelectedExper{
  static readonly type = '[ExperienceTypeModel] Set ExperienceType'
  constructor(public experienceTypeModel: ExperienceTypeModel) {
  }
}
