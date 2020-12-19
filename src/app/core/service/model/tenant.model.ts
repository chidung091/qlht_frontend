import {OtherInforSchool} from './other-infor-school';


export class TenantModel {
  name?: string;
  maTruong?: string;
  tenVietTat?:string;
  tenHieuTruong?: string;
  sdtHieuTruong?: string;
  ngayThanhLap?: string;
  diaChi?: string;
  dienThoai?: string;
  fax?: string;
  web?:string;
  email?: string;
  maSoThue?: string;
  khoaHoc?: string;
  coQuanChuQuan?: string;
  maDonViQuanLy?: string;
  tenDonViQuanLy?: string;
  maLoaiTruong?:string;
  maLoaiHinhDaotao?: string;
  maKhuVuc?: string;
  maTinh?: string;
  maHuyen?: string;
  maXa?: string;
  mucChuan?: string;
  maVungKhoKhan?:string;
  trangThai?: string;
  extraProperties?: Extra;
  id?: string;

  mucChuanQuocGiaId?: string;
  capHoc?: number;
  maDinhDanh?: string;
  maLoaiHinhDaoTaoChiTiet?: string;

}

export class Extra {
  public extra: string[];
}
