export class GetEmployeeByFacultyId{
  static readonly type = '[Employee] Get employee by FacultyId';
  constructor(public facultyId: string) {
  }
}
