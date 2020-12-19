import {ExamViolationTypeModel} from './exam-violation-type.model';

export interface ItemExamViolationTypeModel {
  totalCount?: number;
  items: ExamViolationTypeModel[];
}
