import { GiangVien } from './giang-vien.model';
import { HocKy } from './hoc-ky.model';
import { HocPhan } from './hoc-phan.model';
import { KetQuaHocTap } from './ket-qua-hoc-tap.model';

export interface LopHocPhan {
  maLopHocPhan: string;
  maHP: string;
  tenDangNhapGV: string;
  maHocKy: string;
  siSo: number;
  trangThai: boolean;
  giangVien?: GiangVien;
  hocKy?: HocKy;
  hocPhan?: HocPhan;
  ketQuaHocTaps?: KetQuaHocTap[];
}
