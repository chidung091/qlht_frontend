export class Year {
  code: string;
  tenantId: string;
  currentYear: boolean;
  startDate: Date;
  endDate: Date;
  firstSemesterStartDate?: Date;
  firstSemesterEndDate?: Date;
  secondSemesterStartDate?: Date;
  secondSemesterEndDate?: Date;
  principalName?: string;
  principalId?: string;
  isActive: boolean;
  description?: string;
  id: string;
}
