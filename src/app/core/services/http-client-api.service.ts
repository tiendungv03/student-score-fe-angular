import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { HocPhan } from '../../model/hoc-phan.model';

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

  private delete(keyUrlApi: string, id: string): Observable<any> {
    const url = `${this.apiUrl}/${keyUrlApi}/${id}`;
    return this.http.delete<any>(url, this.getHttpOptions());
  }

  // ========== Tài khoản ==========
  getAccounts(): Observable<any> {
    return this.get(this.keyTaiKhoans);
  }

  createAccount(data: any): Observable<any> {
    return this.post(this.keyTaiKhoans, data);
  }

  updateAccount(id: string, data: any): Observable<any> {
    return this.put(this.keyTaiKhoans, id, data);
  }

  deleteAccount(id: string): Observable<any> {
    return this.delete(this.keyTaiKhoans, id);
  }

  // ========== Phân quyền ==========
  getPermissions(): Observable<any> {
    return this.get(this.keyPhanQuyens);
  }

  // ========== Khoa ==========
  getDepartments(): Observable<any> {
    return this.get(this.keyKhoas);
  }

  createDepartments(data: any): Observable<any> {
    return this.post(this.keyKhoas, data);
  }

  updateDepartments(maKhoa: string, data: any): Observable<any> {
    return this.put(this.keyKhoas, maKhoa, data);
  }

  deleteDepartments(maKhoa: string): Observable<any> {
    return this.delete(this.keyKhoas, maKhoa);
  }

  // ========== Sinh viên ==========
  getStudents(): Observable<any> {
    return this.get(this.keySinhViens);
  }

  getSinhVienById(tenDangNhap: string) {
    return this.getById(this.keySinhViens, tenDangNhap);
  }

  postStudent(data: any): Observable<any> {
    return this.post(this.keySinhViens, data);
  }

  putStudent(tenDangNhap: string, data: any): Observable<any> {
    return this.put(this.keySinhViens, tenDangNhap, data);
  }

  deleteStudent(tenDangNhap: string): Observable<any> {
    return this.delete(this.keySinhViens, tenDangNhap);
  }

  // ========== Giảng viên ==========
  getTeachers(): Observable<any> {
    return this.get(this.keyGiangViens);
  }

  getByTeachers(tenDangNhap: string) {
    return this.getById(this.keyGiangViens, tenDangNhap);
  }

  postTeachers(data: any): Observable<any> {
    return this.post(this.keyGiangViens, data);
  }

  putTeacher(tenDangNhap: string, data: any): Observable<any> {
    return this.put(this.keyGiangViens, tenDangNhap, data);
  }

  deleteTeachers(tenDangNhap: string): Observable<any> {
    return this.delete(this.keyGiangViens, tenDangNhap);
  }

  // ========== Học kỳ ==========
  getHocKies(): Observable<any> {
    return this.get(this.keyHocKies);
  }

  // ========== Học phần ==========
  getHocPhans(): Observable<any> {
    return this.get(this.keyHocPhans);
  }

  postHocPhans(data: any): Observable<any> {
    return this.post(this.keyHocPhans, data);
  }

  putHocPhans(maHP: string, data: any): Observable<any> {
    return this.put(this.keyHocPhans, maHP, data);
  }

  deleteHocPhans(maHP: string): Observable<any> {
    return this.delete(this.keyHocPhans, maHP);
  }

  // ========== Lớp học phần ==========
  getLopHocPhans(): Observable<any> {
    return this.get(this.keyLopHocPhans);
  }

  getByLopHocPhan(maLopHocPhan: string) {
    return this.getById(this.keyLopHocPhans, maLopHocPhan);
  }

  postLopHocPhans(data: any): Observable<any> {
    return this.post(this.keyLopHocPhans, data);
  }

  putLopHocPhans(maLopHocPhan: string, data: any): Observable<any> {
    return this.put(this.keyLopHocPhans, maLopHocPhan, data);
  }

  deleteLopHocPhans(maLopHocPhan: string): Observable<any> {
    return this.delete(this.keyLopHocPhans, maLopHocPhan);
  }
}
