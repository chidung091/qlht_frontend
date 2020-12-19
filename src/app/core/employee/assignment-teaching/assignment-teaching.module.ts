export class AssignmentTeachingModel {
  id?: string;
  teachingAssignmentId?: string;
  employeeId?: string;
  employeeName?: string;
  classId?: string;
  className?: string;
  semester?: string;
  academicYearId?: string;
  classSubjectId?: string;
  classSubjectName?: string;
  facultyId?: string;
  facultyName?: string;
  concurrentHourNumber?: string;
  assignedHourNumber?: string;
  isActive?: boolean;
}

export class ListAssignmentTeaching {
  items?: AssignmentTeachingModel[];
  totalCount?: number;
}

export class SemesterModel {
  id?: string;
  name?: string;
}

