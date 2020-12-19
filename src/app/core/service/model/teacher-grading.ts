export class TeacherGradingModel {
  id:string;
  employeeId: string;
  employeeCode: string;
  employeeName: string;
  schoolYearId: string;
  schoolYearCode: string;
  expireEditDate: string;
  employeeEvaluationHistory: EvaluationHionHistory[];
}

export class  ItemTeacherGrading {
  totalCount: number;
  items: TeacherGradingModel[];
}

export class EvaluationHionHistory {
  criteriaCode: string;
  criteriaValue: string;
}

export class TeacherGradingFindModel{
  facultyId?:string;
  schoolYearID: string;
  schoolYearCode:string;
  evaluationGroupCode:string;
  fullName?:string;
  sorting: string;
  skipCount: number;
  maxResultCount: number;
}
export class ProfessionalStandardsModel{
  facultyId?:string;
  schoolYearId: string;
  employeeName?:string;
  sorting: string;
  skipCount: number;
  maxResultCount: number;
}

