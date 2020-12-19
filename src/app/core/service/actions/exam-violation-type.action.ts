import {FaultCriteriaModel} from '../model/fault-criteria.model';
import {ExamViolationTypeModel} from "../model/exam-violation-type.model";

export class GetAllExam {
  static readonly type = '[ExamViolationTypeModel] Get All ExamViolationType'
}
export class PostExam {
  static readonly type = '[ExamViolationTypeModel] Post ExamViolationType'
  constructor(public examViolationTypeModel: ExamViolationTypeModel) {
  }
}
export class DeleteExam{
  static readonly type = '[ExamViolationTypeModel] Delete ExamViolationType'
  constructor(public id: string) {
  }
}
export class PutExam{
  static readonly type = '[ExamViolationTypeModel] Put ExamViolationType'
  constructor(public id: string, public examViolationTypeModel: ExamViolationTypeModel) {
  }
}
export class DeleteListExam{
  static readonly type = '[ExamViolationTypeModel] Delete List ExamViolationType'
  constructor(public ids: string[]) {
  }
}
export class GetPaginationExam{
  static readonly type = '[ExamViolationTypeModel] Pagination ExamViolationType'
  constructor(public keyword: string, public nameManagement: number, public pageSize: number, public skip: number) {
  }
}
