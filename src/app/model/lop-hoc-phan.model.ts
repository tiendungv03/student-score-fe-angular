import { GiangVien } from './giang-vien.model';
import { HocKy } from './hoc-ky.model';
import { HocPhan } from './hoc-phan.model';
import { KetQuaHocTap } from './ket-qua-hoc-tap.model';

export interface LopHocPhan {
  maLopHocPhan: string;
  maHP: string;
   tenHP?: string;
  soTinChi?: number;
  tenDangNhapGV: string;
  maHocKy: string;
  siSo: number;
  siSoToiDa: number;
  trangThai: boolean;
  ngayBatDauDay: string;
  ngayKetThucDay: string;
  tietHocId: string;
  phong: string;
  giangVien?: GiangVien;
  hocKy?: HocKy;
  hocPhan?: HocPhan;
  ketQuaHocTaps?: KetQuaHocTap[];
}
