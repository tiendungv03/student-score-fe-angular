import { SinhVien } from './sinh-vien.model';
import { LopHocPhan } from './lop-hoc-phan.model';

export interface KetQuaHocTap {
  tenDangNhapSV: string;
  maLopHocPhan: string;
  maHocKy: string;
  diemQT: number;
  diemThi: number;
  diemTongKet: number;
  diemHe4: number;
  xepLoai: string;
  trangThai: boolean;
}
