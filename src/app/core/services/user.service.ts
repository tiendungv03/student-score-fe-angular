// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://localhost:7058/api/Authentication';

  //Key URL
  private keyLogin = 'login';
  private keyRegister = 'register';
  private keyChangePassword = 'change-password';

  constructor(private http: HttpClient, 
    private accountService : AccountService
  ) {}

  getHttpOptions() {
    const token = localStorage.getItem('authToken');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
  }

  login(studentId: string, password: string): Observable<any> {
    const body = {
      tenDangNhap: studentId,
      matKhau: password,
    };
    return this.http.post<any>(`${this.apiUrl}/${this.keyLogin}`, body);
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
  const body = { oldPassword, newPassword };
  return this.http.post<any>(`${this.apiUrl}/${this.keyChangePassword}`, body,this.getHttpOptions()
);
}
}
