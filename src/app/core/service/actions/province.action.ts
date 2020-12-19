export class GetAllProvince{
  static readonly type = '[Province] Get all province';
}

export class GetProvince {
  static readonly type = '[Province] Get province';
  constructor(public maTp: string) {
  }
}
