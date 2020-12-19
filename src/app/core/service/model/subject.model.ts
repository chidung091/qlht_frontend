export interface SubjectModel {
  id: string;
  gradeLevelCode: string;
  gradeLevel: string;
  subjectId: string;
  subjectName: string;
  acronymName: string;
  subjectType: number;
  subjectSpecies: number;
  numberLessionSemester1: number;
  numberLessionSemester2: number;
  schoolYearId: string;
  schoolYearCode: string;
  isActive: boolean;
}

export interface ItemSubjectModel {
  totalCount: number;
  items: SubjectModel[];
}

export interface SaveSubjectModel {
  classId: string; // id lớp
  gradeLevelCode: string; // mã khối
  gradeLevel: string; // tên khối
  className: string; // tên lớp
  schoolYearId: string; // id năm học
  schoolYearCode: string; // tên năm học
  isApplyGradeLevel: boolean; // áp dụng toàn khối
  schoolLevelCode: string; // mã cấp học
  subjects: SubjectModel[];
}

export interface GradeModel {
  id?: string
  maLoaiDanhMuc?: string;
  maDanhMuc?: string;
  tenDanhMuc?: string;
}

export interface GetSubjectModel {
  gradeLevelCode?: string; // mã cấp học
  classId?: string; // id lớp
  schoolYearId?: string; // id năm
  schoolLevelCode?: string; // tên năm
  sorting?: string; 
  skipCount?: number;
  maxResultCount?: number;
}
export interface GradeLevelModel {
  id : string;
  cateCodeType : string;
  cateCode : string;
  cateName : string;
  parentCateCode : string;
}
