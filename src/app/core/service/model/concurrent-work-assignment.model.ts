export class ConcurrentWorkAssignmentModel {
  id:string;
  facultyId:string;
  facultyName: string;
  concurrentworkTypeId: string;
  concurrentworkTypeName: string;
  employeeId: string;
  tenantId: string;
  schoolYear: string;
  employeeCode: string;
  employeeName: string;
  sectionPerWeek: number;
  semester: 0;
  positionStaffCode: string;
  positionStaffName: string
  creationTime: string;
}
export class ItemConcurrentWorkAssignmentModel {
  items: ConcurrentWorkAssignmentModel[];
  totalCount: number;
}
export class AddingConcurrentWorkAssignmentModel{
  employeeIds: string[];
  concurrentWorkAssignment: ConcurrentWorkAssignmentAdd;

}
export class ConcurrentWorkAssignmentAdd {
  facultyId: string;
  facultyName: string;
  concurrentworkTypeId: string;
  concurrentworkTypeName: string;
  employeeId: string;
  employeeName: string;
  sectionPerWeek: number
  schoolYear: string
  semester: string;
  schoolYearId: string;
}
