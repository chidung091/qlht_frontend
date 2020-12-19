import {Department} from '../model/department.model';


export class ListDepartment {
  static readonly type = '[department] Get List';
}

export class AddDepartment {
  static readonly type = '[department] Add Department'
    constructor(public department: Department) {
  }
}

export class UpdateDepartment {
  static readonly type = '[department] Update Department'
  constructor(public department: Department) {
  }
}

export class DeleteDepartment {
  static readonly type = '[department] Delete Department'
  constructor(public stt: string) {
  }
}

export class GetDepartment {
  static readonly type = '[department] Get Department'
  constructor(public Keyword: string, public nameManagerment: string,public pageSize: number, public skip: number) {
  }
}

export class GetDepartmentByMaxResul {
  static readonly type = '[department] Get Department by max rusul'
  constructor(public num: number) {
  }
}

export class DeleteListDepartment {
  static readonly type = '[department] Delete list departerment'
  constructor(public listId: string[]) {
  }
}
