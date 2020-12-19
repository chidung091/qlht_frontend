export interface GroupEvaluationCriteria{
  id: string;
  creationTime: Date;
  employeeSelfAssign: boolean; //nhân viên tự chỉ định
  code: string;
  name: string;
  evaluationCriteriaRequests: string;//Yêu cầu tiêu chí đánh giá
}
