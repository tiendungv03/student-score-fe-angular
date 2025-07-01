import { LopHocPhan } from './lop-hoc-phan.model';

export interface HocKy {
  maHocKy: string;
  namHoc: string;
  hocKySo: number;
  trangThai: boolean;
  lopHocPhans?: LopHocPhan[];
}
