export class GetDistrictOfProvince{
  static readonly type = '[District] Get district of province';
  constructor(public idProvince: string) {
  }
}

export class GetDistrict {
  static readonly type = '[District] Get district'
  constructor(public maHuyen: string) {
  }

}export class ResetDistrict {
  static readonly type = '[District] Reset district'
  constructor() {
  }
}
