export class GetCatalog {
  static readonly type = '[CatalogModel] Get'
  constructor(public categoryCode : string) {
  }
}

export class GetCatalogOne {
  static readonly type = '[CatalogModel] GetCatalog'
  constructor(public id: string) {
  }
}
export class GetCatalogTwo {
  static readonly type = '[CatalogModel] GetCatalogTwo'
  constructor(public categoryCode: string,public categoryParentCode: string) {
  }
}

// lấy danh mục dùng chung đánh giá viên chức
export class GetCatalogDGVC {
  static readonly type = '[CatalogModel] GetCatalogDGVC'
}

// lấy danh mục bồi dưỡng thường xuyên
export class GetCatalogBDTX {
  static readonly type = '[CatalogModel] GetCatalogBDTX'
}

// lấy danh mục giáo viên giỏi
export  class GetCatalogGVG {
  static readonly type = '[CatalogModel] GetCatalogGVG'
}

// Lấy danh mục đơn vị

export class GetAgency {
  static readonly type = '[Category] Get agency'
}

// export class GetCatalogStandard{
//   static readonly type = '[CatalogModel] GetStandard'
//   constructor(public catagoryCode: string) {
//   }
// }
