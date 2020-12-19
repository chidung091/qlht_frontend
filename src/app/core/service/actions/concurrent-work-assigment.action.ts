import {ConcurrentWorkAssignmentModel} from "../model/concurrent-work-assignment.model";

export class GetListConcurrentWAssiPage {
  static readonly type = '[ConcurrentWAssi] list concurrent work assigments'
  constructor(public namHocId:string,public pageSize:number,public skip: number) {
  }
}

export class AddConcurrentWAssi {
  static readonly type = '[ConcurrentWAssi] add concurrent work assigment'
  constructor(public concurrentWAssi: ConcurrentWorkAssignmentModel) {
  }
}

export class EditConcurrentWAssi {
  static readonly type = '[ConcurrentWAssi] edit concurrent work assigment'
  constructor(public concurrentWAssi: ConcurrentWorkAssignmentModel) {
  }
}

export class DeleteConcurrentWAssi {
  static readonly type = '[ConcurrentWAssi] delete concurrent work assigment'

}
