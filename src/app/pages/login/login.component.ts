import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
// import { jwtDecode } from 'jwt-decode';
import { jwtDecode } from 'jwt-decode'; // Thư viện để giải mã JWT token

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      studentId: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const studentId: string = this.loginForm.get('studentId')?.value;
    const password: string = this.loginForm.get('password')?.value;
    // console.log('Đăng nhập với mã sinh viên:', studentId);
    // console.log('Mật khẩu:', password);

    if (typeof studentId !== 'string' || typeof password !== 'string') {
      alert('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    this.userService.login(studentId, password).subscribe({
      next: (response) => {
        console.log('Đăng nhập thành công:', response);
        const token = response?.token;
        // const role = response?.role;
        // console.log('role:', role);
        if (!token) {
          console.error('Không có token trong phản hồi đăng nhập');
          alert('Đăng nhập không thành công, vui lòng thử lại!');
          return;
        }

        const decodedToken: any = jwtDecode(token);
        const userName =
          decodedToken[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
          ];
        const userRole =
          decodedToken[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ];

        console.log('Decoded token:', decodedToken);
        console.log('User name:', userName);
        console.log('User role:', userRole);

        // Lưu token và role
        this.authService.setToken(token);
        localStorage.setItem('userRole', userRole);

        // Điều hướng theo role
        switch (userRole) {
          case 'Admin':
            this.router.navigate(['/admin']);
            break;
          case 'GiangVien':
            this.router.navigate(['/teacher']);
            break;
          case 'SinhVien':
            this.router.navigate(['/student']);
            break;
          default:
            this.router.navigate(['/404']);
            break;
        }
      },
      error: (err) => {
        console.error('Lỗi đăng nhập:', err);
        alert('Sai mã sinh viên hoặc mật khẩu!');
      },
    });
  }

  async loginWithGoogle() {
    // Đoạn Google login sẽ triển khai sau
  }
}
