
export class ExtraTenant {
  extras: string[];
}

export interface SchoolLevel {
  id: string;
  schoolLevelCode: string;
  schoolLevelName: string;
}

export class TenantInfo {
  id: string;
  name: string;
  identifiCode: string;
  code: string;
  abbreviationName?: any;
  principalName: string;
  principalPhone: string;
  foundedDay: string;
  address: string;
  phoneNumber: string;
  fax: string;
  level: number;
  web: string;
  email: string;
  taxCode?: any;
  course: string;
  agency: string;
  managementUnitCode: string;
  managementUnitName: string;
  typeCode?: any;
  educationTypeCode: string;
  detailedTrainingType: number;
  areaCode: string;
  provinceCode: string;
  districtCode: string;
  wardCode: string;
  standardLevel: string;
  poorAreaCode?: any;
  isActive: boolean;
  imageSrc?: any;
  extraProperties?: ExtraTenant;
  schoolLevels?: any[];
  schoolPlaces?: SchoolPlaces[];
  isFirstLogin?: boolean;
}

export interface SchoolPlaces {
  id: string;
  tenantId: string;
  schoolPlaceCode: string;
  schoolPlaceName: string;
  phoneNumber?: any;
  address?: any;
  distance?: any;
  description?: any;
  acreage?: any;
  provinceCode: string;
  districtCode: string;
  adminUserId?: any;
  creationTime: Date;
}

export interface Place {
  id: string;
  name: string;
  primary: boolean;
}
