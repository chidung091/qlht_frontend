import {TeacherGrading} from '../model/teacher-grading';

export class GetTeacherGradingByPage {
  static readonly type = '[Teacher grading] get Teacher-grading by page'
  constructor(public namHoc: string, public idSchoolFaculty: string, public pageSize: number, public skip: number ) {
  }
}

export class SaveTeacherGrading {
  static readonly type = '[Teacher grading] save teacher-grading'
  constructor(public teacherGradings: TeacherGrading[]) {
  }
}

export class DeleteTeacherGrading {
  static readonly type = '[Teacher grading] delete teacher-grading'
  constructor(public teacherGrading: any) {
  }
}
