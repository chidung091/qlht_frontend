export class HeadTeacherAssignmentModel{
  employeeId: string; //id gvcn
  employeeName: string;//id gvcn
  facultyId: string;  //id tổ bộ môn
  facultyName: string; //tên tổ bộ môn
  schoolYearId: string; //id năm học
  schoolYearName: string; // tên năm học
  gradeLevelCode: string; //id khối
  gradeLevelName: string; // tên khối
  classRoomId: string; // id lớp học
  classRoomName: string; //tên lớp học

  constructor(employeeId: string, employeeName: string,
              facultyId: string,facultyName: string,
              schoolYearId: string,schoolYearName: string,
              gradeLevelCode: string,gradeLevelName: string,
              classRoomId: string,classRoomName: string) {
    this.employeeId = employeeId;
    this.employeeName = employeeName;
    this.facultyId = facultyId;
    this.facultyName = facultyName;
    this.schoolYearId = schoolYearId;
    this.schoolYearName = schoolYearName;
    this.gradeLevelCode = gradeLevelCode;
    this.gradeLevelName = gradeLevelName;
    this.classRoomId = classRoomId;
    this.classRoomName = classRoomName;
  }
}
