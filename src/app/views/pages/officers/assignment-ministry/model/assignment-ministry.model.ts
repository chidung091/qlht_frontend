export class AssignmentMinistryModel{
  id: string
  employeeId: string
  employeeName: string
  schoolYearId: string
  schoolYearName: string
  gradeLevelCode: string
  gradeLevelName: string
  classRoomId: string
  classRoomName: string
  roleId: string
  roleName: string
  isGranted: boolean
  constructor(id: string, employeeId: string, employeeName: string, schoolYearId: string, schoolYearName: string, gradeLevelCode: string, gradeLevelName: string, classRoomId: string, classRoomName: string, roleId: string, roleName: string, isGranted: boolean) {
    this.id = id;
    this.employeeId = employeeId;
    this.employeeName = employeeName;
    this.schoolYearId = schoolYearId;
    this.schoolYearName = schoolYearName;
    this.gradeLevelCode = gradeLevelCode;
    this.gradeLevelName = gradeLevelName;
    this.classRoomId = classRoomId;
    this.classRoomName = classRoomName;
    this.roleId = roleId;
    this.roleName = roleName;
    this.isGranted = isGranted;
  }
}
