export class SanPham{
  tenthuoc?: string;
  giathuocban?: number;
  donvinhap?: string;
  soluong?: number;
  tongtiensp?: number;
}
export class Userinfo {
  _id?: string;
  loaihd?: string;
  SanPham?: [];
}
export class Bill {
  success?: boolean;
  message?: string;
  Totalpages?: number;
  Userinfo?: [];
}
