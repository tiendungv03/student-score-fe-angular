import { SinhVien } from './sinh-vien.model';
import { LopHocPhan } from './lop-hoc-phan.model';

export interface KetQuaHocTap {
  tenDangNhapSV: string;
  maLopHocPhan: string;
  diemQT: number;
  diemThi: number;
  diemTongKet: number;
  xepLoai: string;
  trangThai: boolean;
  sinhVien?: SinhVien;
  lopHocPhan?: LopHocPhan[];
}
