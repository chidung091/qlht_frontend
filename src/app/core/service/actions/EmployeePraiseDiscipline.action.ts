import {EmployeePraiseDiscipline} from "../model/employee-praise-discipline.model";

export class GetEmployeePraiseDiscipline {
  static readonly type = '[EmployeePraiseDiscipline] Get EmployeePraiseDiscipline'
  constructor(public pageSize: number,public skip: number) {
  // constructor(public toBoMonId: string, public canBoId: string,public isKhenThuong: boolean,public pageSize: number, public skip: number) {
  }
}

export class GetPraise {
  static readonly type = '[EmployeePraiseDiscipline] GetPraise'
  constructor(public pageSize: number,public skip: number) {
    // constructor(public toBoMonId: string, public canBoId: string,public isKhenThuong: boolean,public pageSize: number, public skip: number) {
  }
}

export class GetDiscipline {
  static readonly type = '[EmployeePraiseDiscipline] GetDiscipline'
  constructor(public pageSize: number,public skip: number) {
    // constructor(public toBoMonId: string, public canBoId: string,public isKhenThuong: boolean,public pageSize: number, public skip: number) {
  }
}

export class Add {
  static  readonly type = '[EmployeePraiseDiscipline] Add';

  constructor(public employeePraiseDiscipline: EmployeePraiseDiscipline) {
  }
}

export class Update {
  static readonly type = '[EmployeePraiseDiscipline] Update';

  constructor(employeePraiseDiscipline: EmployeePraiseDiscipline, public id: string) {
  }
}
export class Delete {
  static readonly type = '[EmployeePraiseDiscipline] Delete';
  constructor(public id: string) {
  }
}
export class DeleteList {
  static readonly type = '[EmployeePraiseDiscipline] Delete';
  constructor(public ids: string[]) {
  }
}
export class Search {
  static readonly type = '[EmployeePraiseDiscipline] Search';
  constructor(public toBoMonId: string, public canBoId: string, public pageSize: number, public skip: number) {
  }
}
export class SearchPraise {
  static readonly type = '[EmployeePraiseDiscipline] SearchPraise';
  constructor(public toBoMonId: string, public canBoId: string, public pageSize: number, public skip: number) {
  }
}
export class SearchDiscipline {
  static readonly type = '[EmployeePraiseDiscipline] SearchDiscipline';
  constructor(public toBoMonId: string, public canBoId: string, public pageSize: number, public skip: number) {
  }
}

