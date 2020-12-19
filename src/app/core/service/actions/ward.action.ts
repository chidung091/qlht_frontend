export class GetWardsOfDistrict{
  static readonly type = '[WardsModel] Get wards of district'
  constructor(public maHuyen: string) {
  }
}

export class GetWard {
  static readonly type = '[WardsModel] Get ward'
  constructor(public maXa: string) {
  }
}

export class ResetWard {
  static readonly type = '[WardsModel] Reset wards'
  constructor() {
  }
}
