import { SinhVien } from './sinh-vien.model';
import { GiangVien } from './giang-vien.model';
import { HocPhan } from './hoc-phan.model';

export interface Khoa {
  makhoa: string;
  tenKhoa: string;
  mota: string;
  trangThai: boolean;
  sinhViens?: SinhVien[];
  giangViens?: GiangVien[];
  hocPhans?: HocPhan[];
}
