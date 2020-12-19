import {ClassroomModel} from '../model/classroom.model';
import {GridParam} from '../model/grid-param';

export class GetAllClassroom {
  static readonly type = '[Classroom] Get all classroom';
}

export class GetNamHoc {
  static readonly type = '[Classroom] Get all Nam Hoc'
}

export class DeleteClassroom {
  static readonly type = '[Classroom] Delete classroom';
  constructor(public id: string) {
  }
}
export class DeleteClassroomList {
  static readonly type = '[Classroom] Delete classroom list';
  constructor(public ids: string[]) {
  }
}
export class AddClassroom {
  static readonly type = '[Classroom] Add classroom';
  constructor(public payload: ClassroomModel) {
  }
}
export class UpdateClassroom{
  static readonly type = '[Classroom] Update classroom';
  constructor(public id: string, public updateClassroom: ClassroomModel) {
  }
}

export class GetLopbyKhoi {
  static readonly type = '[Classroom] Get lop by khoi';
  constructor(public Keyword: string) {
  }
}

export class GetClassByPage{
  static readonly type = '[Classroom] Get lop theo trang';
  constructor(public khoi: string, public  lop: string, public nameTeacher: string, public skip: number, public pageSize: number) {
  }
}
export class GetClassByGradeAndYear{
  static readonly type = '[Classroom] Get lop học theo khoi va theo nam';
  constructor(public khoi: string, public  namHoc: string) {
  }
}
export class GetClassByYear{
  static readonly type = '[Classroom] Get lop học theo nam';
  constructor(public  namHoc: string) {
  }
}
export class ResetClassSearch{
  static readonly type = '[Classroom] Set lop search';
}

