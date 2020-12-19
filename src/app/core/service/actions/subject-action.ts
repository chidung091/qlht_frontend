import {GetSubjectModel, SaveSubjectModel} from '../model/subject.model';

export class GetAllSubject {
  static readonly type = '[Subject] Get all subject'
}

export class GetSubjectByClass {
  static readonly type = '[Subject] Get subject by class'
  constructor(public data: GetSubjectModel) {
  }
}

export class SaveSubject {
  static readonly type = '[Subject] Save subject'
  constructor(public data: SaveSubjectModel, public getData: GetSubjectModel) {
  }
}

export class GetAllGrade {
  static readonly type = '[Grade] Load grade'
  constructor() {
  }
}
