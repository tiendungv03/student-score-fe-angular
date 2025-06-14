import { TaiKhoan } from './tai-khoan.model';
import { Khoa } from './khoa.model';
import { KetQuaHocTap } from './ket-qua-hoc-tap.model';

export interface SinhVien {
  tenDangNhap: string;
  hoTen: string;
  ngaySinh: string;
  gioiTinh: boolean;
  lop: string; // Lưu maLopHocPhan thay vì maHP
  maKhoa: string;
  trangThai: boolean;
  taiKhoan?: TaiKhoan;
  khoa?: Khoa;
  ketQuaHocTaps?: KetQuaHocTap[];
}
