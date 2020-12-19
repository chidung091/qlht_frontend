import {SchoolInformationModel} from '../model/school-information.model';

export class GetData{
  static readonly type = '[SchoolInformationModel] Get';
}

export class AddData{
  static readonly type = '[SchoolInformationModel] Add';

  constructor(public createData: SchoolInformationModel) {
  }
}

export class GetDataSchoolInformationSubding{
  constructor(public skipCount: number, public maxResultCount: number) {
  }

  static readonly type = '[SchoolInformationModel] Get';
}

export class UpdateData{
  static readonly type = '[SchoolInformationModel] Update';

  constructor(public id: string, public updateData: SchoolInformationModel) {
  }
}

export class DeleteData{
  static readonly type = '[SchoolInformationModel] Delete';
  constructor(public id: string) {
  }
}

export class DeleteMultiple{
  static readonly type = '[SchoolInformationModel] DeleteMultiple';
  constructor(public ids: string[]) {
  }
}

export class SelectedData{
  static readonly type = '[SchoolInformationModel] Set';
  constructor(public selectedData: SchoolInformationModel) {
  }
}

export class GetAllSchoolSubsidiary{
  static readonly type = '[School-subsidiary] Get all school subsidiary';
}
