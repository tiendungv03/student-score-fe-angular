import { Khoa } from './khoa.model';
import { LopHocPhan } from './lop-hoc-phan.model';

export interface HocPhan {
  maHP: string;
  tenHP: string;
  soTinChi: number;
  batBuoc: boolean;
  maKhoa: string;
  trangThai: boolean;
  khoa?: Khoa;
  lopHocPhans?: LopHocPhan[];
}
