// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://localhost:7058/api/Authencation/login';

  constructor(private http: HttpClient) {}

  login(studentId: string, password: string): Observable<any> {
    const body = {
      tenDangNhap: studentId,
      matKhau: password,
    };
    return this.http.post<any>(this.apiUrl, body);
  }
}
