export class ProfessionalStandardModel{
  id: string;
  employeeId: string;
  employeeName: string;
  employeeCode: string;
  facultyId: string;
  facultyName: string;
  employeeBirthDate: Date;
  employeeGender: string;
  employeePositionStaff: string;
  employeePositionGroup: string;
  employeeSelfAssessmentResult: string;
  superiorSelfAssessmentResult: string;
}

export interface ItemProfessionalStandardModel{
  totalCount: number;
  items: ProfessionalStandardModel[];
}

export interface EvaluationHistoryModel{
    id: string;
    careerStandardEvaluationId: string;
    employeeId: string;
    criteriaCode: string;
    criteriaContent: string;
    criteriaValue: string;
    superiorEvaluationValue: string;
    employeeEvaluationValue: string;
    expireEditDate: Date;
}

export class NewEvaluationHistoryModel{
  id: string;
  careerStandardEvaluationId: string;
  employeeId: string;
  criteriaCode: string;
  criteriaContent: string;
  criteriaValue: string;
  superiorEvaluationValue: string;
  employeeEvaluationValue: string;
  expireEditDate: Date;
}

export interface CreatProfessionalStandardModel{
    employeeId: string;
    employeeSelfAssessmentResult: string;
    superiorSelfAssessmentResult: string;
    schoolYearId: string;
    schoolYear: string;
    lstEvaluationHistory: any[];
}
export interface HistoryProfessionalStandardModel{
  employeeId: string;
  employeeSelfAssessmentResult: string,
  superiorSelfAssessmentResult: string;
  schoolYearId: string;
  schoolYear: string;
  lstEvaluationHistory: EvaluationHistoryModel[];
}
