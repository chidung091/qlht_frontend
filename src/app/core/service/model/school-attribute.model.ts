export class SchoolAttributeModel {
  id: string;
  cateCodeType: string;
  cateCode: string;
  cateName: string;
  parentCateCode: string;
}

export class SchoolAttParentChildModel {
  cateCode: string;
  cateName: string
}

export class SchoolAttributeChildModel {
  categoryPropertyTenantKey: SchoolAttParentChildModel;
  listCategory: SchoolAttributeModel[];
}

export class ListSchoolAttributeModel {
  listProperty: SchoolAttributeModel[];
  listOtherProperty: SchoolAttributeChildModel[];
}

export class SchoolAttributeBindingModel {
  cateCode?: string;
  cateName?: string;
  status?: boolean;


  constructor(cateCode: string, cateName: string, status: boolean) {
    this.cateCode = cateCode;
    this.cateName = cateName;
    this.status = status;
  }
}
