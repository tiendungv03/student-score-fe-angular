import { TaiKhoan } from './tai-khoan.model';

export interface PhanQuyen {
  id: number;
  tenQuyen: string;
  trangThai: boolean;
  taiKhoans?: TaiKhoan[];
}
