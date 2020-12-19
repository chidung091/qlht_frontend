export interface Subjects {
    id: string,
    facultyName: string,
    employeeManagementName:string,
    note: string,
    tenantId: any,
    creationTime: any
}

export interface Achivement {
    id: string,
    cateCodeType: string,
    cateCode: number,
    cateName:string,
    parentCateCode: any,
    parentCateName: any
}

export class Officer {
    id: string;
    code: string;
    fullName: string;
    tenantId: string;
    schoolFacultyID: string;
    birthDate: string;
    sexCode: string;
}
  