export class SanPham{
  tenthuoc?: string;
  giathuocban?: number;
  donvinhap?: string;
  soluong?: number;
  tongtiensp?: number;
}
export class Billinfo {
  _id?: string;
  loaihd?: string;
  SanPham?: [];
  thoigianhd?:Date;
  tongiien?:number;
}
export class Bill {
  success?: boolean;
  message?: string;
  Totalpages?: number;
  Billinfo?: [];
}

export class CategoryFault {
  faultInfos: FaultInfo[];
  success: boolean;
  message:string;
}
export class FaultInfo {
  _id: string;
  tenthuoc:string;
  mota: string;
  giathuocnhap: number;
  giathuocban: number;
  donvinhap: string;
  nhasanxuat: string;
  soluong: number;
  danhmuc: string;
}
