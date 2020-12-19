export class SchoolFacultyModel {
  id: string;
  facultyName: string;
  employeeManagementName?: string;
  note?: string;
  tenantId?: string;
  creationTime?: string;
}

export class ListSchoolFacultyModel {
  totalCount?: string;
  items: SchoolFacultyModel[];
}
