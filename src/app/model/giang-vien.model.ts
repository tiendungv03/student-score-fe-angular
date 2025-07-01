import { Khoa } from './khoa.model';
import { LopHocPhan } from './lop-hoc-phan.model';
import { TaiKhoan } from './tai-khoan.model';

export interface GiangVien {
  tenDangNhap: string;
  hoTen: string;
  bomon: string;
  maKhoa: string;
  ngayBatDauGiangDay: Date;
  ngayKetThucGiangDay: Date;
  trangThai: boolean;
  taiKhoan?: TaiKhoan;
  khoa?: Khoa;
  lopHocPhans?: LopHocPhan[];
}
