import { PhanQuyen } from './phan-quyen.model';
import { SinhVien } from './sinh-vien.model';
import { GiangVien } from './giang-vien.model';

export interface TaiKhoan {
  tenDangNhap: string;
  matKhau: string;
  idPhanQuyen: number;
  trangThai: boolean;
  phanQuyen?: PhanQuyen;
  sinhVien?: SinhVien;
  giangVien?: GiangVien;
}
