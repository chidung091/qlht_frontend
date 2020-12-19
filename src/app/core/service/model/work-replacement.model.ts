export class WorkReplacementModel {
  id: string
  workCode: string;
  workName: string;
  employeeConcurrentId: string;
  employeeConcurrentName: string;
  employeeReplaceId: string;
  employeeReplaceName: string;
  facultyId: string;
  facultyName: string;
  dateFrom: string;
  dateTo: string;
  note: string;
  schoolYear: string;
  sectionPerWeek: number
  creationTime: string;
}

export class ItemWorkReplacementMode{
  totalCount: number;
  items: WorkReplacementModel[];
}
