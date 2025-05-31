import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';

  constructor() {}

  // Lưu token vào localStorage
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Lấy token từ localStorage
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Xóa token (đăng xuất)
  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('userRole');
  }

  // Kiểm tra đã đăng nhập hay chưa
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
