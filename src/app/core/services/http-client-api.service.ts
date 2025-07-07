import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpClientApiService {
  private apiUrl = 'https://localhost:7058/api';

  public getHttpOptions() {
    const token = this.authService.getToken();
    // console.log('Token:', token);
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  constructor(private http: HttpClient, private authService: AuthService) {}

  // ========== Key URL ==========

  private keyTaiKhoans = 'TaiKhoans';
  private keyPhanQuyens = 'PhanQuyens';
  private keyKhoas = 'Khoas';
  private keySinhViens = 'SinhViens';
  private keyGiangViens = 'GiangViens';
  private keyHocPhans = 'HocPhans';
  private keyLopHocPhans = 'LopHocPhans';
  private keyHocKies = 'HocKys';

  //giangvien
  private giangvienKeyThoiKhoaBieu = 'giangvien/GiangViens/thoi-khoa-bieu';
  private giangvienKeyThongTinGiangVien =
    'giangvien/GiangViens/thong-tin-giang-vien';
  private giangvienKeyLopHocPhan = 'giangvien/GiangViens/lop-hoc-phan';
  private giangvienKeySVL = 'giangvien/GiangViens/sinh-vien-lop';

  private keyKetQuaHocTapDangki = 'sinhvien/KetQuaHocTap/dang-ki';

  //sinh vien
  private keySinhVien = 'sinhvien/SinhViens';
  private keySinhVienKQHoc = 'sinhvien/KetQuaHocTap';
  private keyHocPhan = 'sinhvien/HocPhans';

  //Admin
  private adminGetTaiKhoans = 'admin/TaiKhoans';
  private adminGetKeySinhViens = 'admin/sinhviens';
  private adminGetKeyGiangViens = 'admin/GiangViens';
  private adminGetKeyHocPhans = 'admin/HocPhans';
  private adminGetKeyLopHocPhans = 'admin/LopHocPhans';
  private adminGetTietHocs = 'admin/TietHocs';
  private adminGetPhanQuyens = 'admin/PhanQuyens';
  private adminGetKetQuaHocTap = 'admin/KetQuaHocTap';
  private adminGetHocKys = 'admin/HocKys';
  private adminGetKhoas = 'admin/Khoas';

  // ========== Hàm tái sử dụng ==========
  private get(keyUrlApi: string): Observable<any> {
    const url = `${this.apiUrl}/${keyUrlApi}`;
    return this.http.get<any>(url, this.getHttpOptions());
  }

  private getById(keyUrlApi: string, id: string): Observable<any> {
    const url = `${this.apiUrl}/${keyUrlApi}/${id}`;
    return this.http.get<any>(url, this.getHttpOptions());
  }

  private post(keyUrlApi: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/${keyUrlApi}`;
    return this.http.post<any>(url, data, this.getHttpOptions());
  }

  private put(keyUrlApi: string, id: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/${keyUrlApi}/${id}`;
    return this.http.put<any>(url, data, this.getHttpOptions());
  }

  private patch(keyUrlApi: string, id: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/${keyUrlApi}/${id}`;
    return this.http.patch<any>(url, data, this.getHttpOptions());
  }

  private delete(keyUrlApi: string, id: string): Observable<any> {
    const url = `${this.apiUrl}/${keyUrlApi}/${id}`;
    return this.http.delete<any>(url, this.getHttpOptions());
  }

  private restoreById(keyUrlApi: string, id: string): Observable<any> {
    const url = `${this.apiUrl}/${keyUrlApi}/${id}`;
    return this.http.post<any>(url, null, this.getHttpOptions());
  }

  // ========== Tài khoản ==========
  getAccounts(): Observable<any> {
    return this.get(this.adminGetTaiKhoans);
  }

  createAccount(data: any): Observable<any> {
    return this.post(this.adminGetTaiKhoans, data);
  }

  updateAccount(id: string, data: any): Observable<any> {
    return this.put(this.adminGetTaiKhoans, id, data);
  }

  deleteAccount(id: string): Observable<any> {
    return this.delete(this.adminGetTaiKhoans, id);
  }

  restoreTaiKhoanById(tenDangNhap: string): Observable<any> {
    const keyUrlApi = `admin/TaiKhoans/restore`;
    return this.restoreById(keyUrlApi, tenDangNhap);
  }

  // ========== Phân quyền ==========
  getPermissions(): Observable<any> {
    return this.get(this.adminGetPhanQuyens);
  }

  // ========== Khoa ==========
  getDepartments(): Observable<any> {
    return this.get(this.adminGetKhoas);
  }

  createDepartments(data: any): Observable<any> {
    return this.post(this.adminGetKhoas, data);
  }

  updateDepartments(maKhoa: string, data: any): Observable<any> {
    return this.put(this.adminGetKhoas, maKhoa, data);
  }

  deleteDepartments(maKhoa: string): Observable<any> {
    return this.delete(this.adminGetKhoas, maKhoa);
  }

  // ========== Sinh viên ==========

  getStudents(): Observable<any> {
    return this.get(this.adminGetKeySinhViens);
  }

  getSinhVienById(tenDangNhap: string) {
    return this.getById(this.adminGetKeySinhViens, tenDangNhap);
  }

  postStudent(data: any): Observable<any> {
    return this.post(this.adminGetKeySinhViens, data);
  }

  putStudent(tenDangNhap: string, data: any): Observable<any> {
    return this.put(this.adminGetKeySinhViens, tenDangNhap, data);
  }

  deleteStudent(tenDangNhap: string): Observable<any> {
    return this.delete(this.adminGetKeySinhViens, tenDangNhap);
  }

  restoreSinhVienById(tenDangNhap: string): Observable<any> {
    const keyUrlApi = `admin/SinhViens/restore`;
    return this.restoreById(keyUrlApi, tenDangNhap);
  }

  // ========== Giảng viên ==========
  getTeachers(): Observable<any> {
    return this.get(this.adminGetKeyGiangViens);
  }

  getByTeachers(tenDangNhap: string) {
    return this.getById(this.adminGetKeyGiangViens, tenDangNhap);
  }

  postTeachers(data: any): Observable<any> {
    return this.post(this.adminGetKeyGiangViens, data);
  }

  putTeacher(tenDangNhap: string, data: any): Observable<any> {
    return this.put(this.adminGetKeyGiangViens, tenDangNhap, data);
  }

  deleteTeachers(tenDangNhap: string): Observable<any> {
    return this.delete(this.adminGetKeyGiangViens, tenDangNhap);
  }

  getThongTinGiangVien(): Observable<any> {
    return this.get(this.giangvienKeyThongTinGiangVien);
  }

  getThoiKhoaBieu(): Observable<any> {
    return this.get(this.giangvienKeyThoiKhoaBieu);
  }

  getLopHocPhanByGiangVien(): Observable<any> {
    return this.get(this.giangvienKeyLopHocPhan);
  }

  getSinhVienLop(maLopHocPhan: string): Observable<any> {
    return this.getById(this.giangvienKeySVL, maLopHocPhan);
  }

  // ========== Học kỳ ==========
  getHocKies(): Observable<any> {
    return this.get(this.adminGetHocKys);
  }

  // getTiet_hoc(): Observable<any> {
  //   const key = `${this.adminGetTietHocs}`;
  //   return this.get(key);
  // }

  postHoc_ky(data: any): Observable<any> {
    return this.post(this.adminGetHocKys, data);
  }

  putHoc_ky(maHocKi: string, data: any): Observable<any> {
    return this.put(this.adminGetHocKys, maHocKi, data);
  }

  deleteHoc_ky(maHocKi: string): Observable<any> {
    // const url = `${this.adminGetKeyLopHocPhans}/${maLopHocPhan}/${maHocKy}`
    return this.delete(this.adminGetHocKys, maHocKi);
  }

  // ========== Học phần ==========
  getHocPhans(): Observable<any> {
    return this.get(this.adminGetKeyHocPhans);
  }

  postHocPhans(data: any): Observable<any> {
    return this.post(this.adminGetKeyHocPhans, data);
  }

  putHocPhans(maHP: string, data: any): Observable<any> {
    return this.put(this.adminGetKeyHocPhans, maHP, data);
  }

  deleteHocPhans(maHP: string): Observable<any> {
    return this.delete(this.adminGetKeyHocPhans, maHP);
  }

  // ========== Lớp học phần ==========
  getLopHocPhans(): Observable<any> {
    return this.get(this.adminGetKeyLopHocPhans);
  }

  getByLopHocPhan(maLopHocPhan: string, maHocKy: string) {
    const url = `${this.apiUrl}/${this.adminGetKeyLopHocPhans}/${maLopHocPhan}/${maHocKy}`;
    return this.http.get<any>(url, this.getHttpOptions());
  }

  postLopHocPhans(data: any): Observable<any> {
    // const key = `${this.adminGetKeyLopHocPhans}/${maLopHocPhan}/${maHocKy}`;
    return this.post(this.adminGetKeyLopHocPhans, data);
  }

  patchLopHocPhans(
    maLopHocPhan: string,
    maHocKy: string,
    data: any
  ): Observable<any> {
    const key = `${this.adminGetKeyLopHocPhans}`;
    const id = `${maLopHocPhan}/${maHocKy}`;
    return this.patch(key, id, data);
  }

  deleteLopHocPhans(maLopHocPhan: string, maHocKy: string): Observable<any> {
    const url = `${maLopHocPhan}/${maHocKy}`;
    return this.delete(this.adminGetKeyLopHocPhans, url);
  }

  // ========== Kết quả học tập ==========
  getKetQuaHocTapById(
    tenSV: string,
    maLopHocPhan: string,
    maHocKy: string
  ): Observable<any> {
    const keyId = `${tenSV}/${maLopHocPhan}/${maHocKy}`;
    return this.getById(this.adminGetKetQuaHocTap, keyId);
  }

  putKetQuaHocTap(
    tenSV: string,
    maLop: string,
    maHK: string,
    data: any
  ): Observable<any> {
    const keyUpdate = `${'nhap-diem'}/${tenSV}/${maLop}/${maHK}`;
    // console.log('api data', data);
    console.log('api key', keyUpdate);
    return this.put(this.adminGetKetQuaHocTap, keyUpdate, data);
  }

  deleteKetQuaHocTap(
    tenSV: string,
    maLopHocPhan: string,
    maHocKy: string
  ): Observable<any> {
    const keyDel = `${tenSV}/${maLopHocPhan}/${maHocKy}`;
    return this.delete(this.adminGetKetQuaHocTap, keyDel);
  }

  // ========== Tiết học ==========
  getTiet_hoc(): Observable<any> {
    const key = `${this.adminGetTietHocs}`;
    return this.get(key);
  }

  postTiet_hoc(data: any): Observable<any> {
    return this.post(this.adminGetTietHocs, data);
  }

  putTiet_hoc(maLopHocPhan: string, data: any): Observable<any> {
    return this.put(this.adminGetTietHocs, maLopHocPhan, data);
  }

  deleteTiet_hoc(maLopHocPhan: string): Observable<any> {
    // const url = `${this.adminGetKeyLopHocPhans}/${maLopHocPhan}/${maHocKy}`
    return this.delete(this.adminGetTietHocs, maLopHocPhan);
  }

  //Users
  getSinh_Vien_Thong_Tin(): Observable<any> {
    const key = `${this.keySinhVien}/${'thong-tin-ca-nhan'}`;
    return this.get(key);
  }

  getThoi_khoa_bieu(): Observable<any> {
    const key = `${this.keySinhVien}/${'thoi-khoa-bieu'}`;
    return this.get(key);
  }

  getHoc_phan(): Observable<any> {
    const key = `${this.keyHocPhan}`;
    return this.get(key);
  }

  getSinh_Vien_LopHocPhan(maHP: string): Observable<any> {
    const keyId = `${maHP}`;
    return this.getById(this.keySinhVien, keyId);
  }

  postKetQuaHocTap(data: any): Observable<any> {
    const key = `${this.keySinhVienKQHoc}/${'dang-ki'}`;
    return this.post(key, data);
  }

  getKet_qua_hoc_tap(): Observable<any> {
    return this.get(this.keySinhVienKQHoc);
  }

  deleteSinhVien_KetQuaHT(
    tenSV: string,
    maLopHocPhan: string,
    maHocKy: string
  ): Observable<any> {
    const keyDel = `${tenSV}/${maLopHocPhan}/${maHocKy}`;
    return this.delete(this.keySinhVienKQHoc, keyDel);
  }
}
