export class ClassroomModel {
  id?: string;
  tenantId?: string;
  schoolYearId?: string; // năm học id
  schoolYearCode?: string; // năm học code
  className?: string; // tenLop
  gradeLevel?: string;  // tên khối
  gradeLevelCode?: string; // mã khối
  description?: string; // moTa
  teacherName?: string; // tenGVCN
  teacherId?: string; // canBoGVCNId
  hasMorningStudy?: boolean; // hocSang
  hasAfternoolStudy?: boolean; // hocChieu
  hasEveningStudy?: boolean;  // hocToi
  isMainMorningStudy?: boolean;  // hocSangChinh
  isMainAfternoolStudy?: boolean; // hocChieuChinh
  isMainEveningStudy?: boolean;  // hocToiChinh
  isCompoundClass?: boolean; // lopGhep
  compoundClassCode?: string;  // maLopGhep
  schoolPlaceId?: string; // maDiemTruong
  classCodeType?: string;  // maLoaiLop
  textBookSetCode?: string; // maBoSachGiaoKhoa
  lessonOfWeekCode?: string; // soBuoiHocTrongTuan
  vocationalTrainingGuideCode?: string; // maHuongNghiepDayNghe
  learnModeCode?: string; // maHinhThucHocTap
  fosteringTrainingProgramCode?: string; // maCTDaoTaoBoiDuong
  foreignLanguage1Code?: string; // maNgoaiNgu1
  foreignLanguageProgram1Code?: string; // maChuongTrinhNgoaiNgu1
  foreignLanguageLesson1Code?: string; // soTietNgoaiNgu1
  foreignLanguage2Code?: string; // maNgoaiNgu2
  foreignLanguageProgram2Code?: string; // maChuongTrinhNgoaiNgu2
  foreignLanguageLesson2Code?: string; // soTietNgoaiNgu2
  extraProperties?: ExtraClass;

}

export class ExtraClass {
  extra: string[];
  constructor() {
    this.extra = [];
  }
}

export interface ItemClassroomModel {
  totalCount: number;
  items: ClassroomModel[];
}
export class ClassroomOtherModel {
  cateCode?: string;
  cateName?: string;
  status?: boolean;


  constructor(cateCode: string, cateName: string, status: boolean) {
    this.cateCode = cateCode;
    this.cateName = cateName;
    this.status = status;
  }
}
