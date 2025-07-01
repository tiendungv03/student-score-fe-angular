import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClientApiService } from '../../../core/services/http-client-api.service';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  giangVienInfomation: any = {}; 
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
    showChangePasswordForm: boolean = false;
  constructor(private HttpCLient: HttpClientApiService,
                  private  userService: UserService ) {}

  ngOnInit() {
   this.loadGVProfile();
  }

  loadGVProfile() {
    this.HttpCLient.getThongTinGiangVien().subscribe({
      next: (data) => {
        this.giangVienInfomation = data;
        console.log('Thông tin giảng viên:', this.giangVienInfomation);
      },
      error: (err) => {
        console.error('Lỗi khi tải thông tin giảng viên:', err);
      }
    });
  }

    validateNewPassword(): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return regex.test(this.newPassword);
  }



  
   onChangePassword() {
    if (!this.oldPassword || !this.newPassword || !this.confirmPassword) {
      alert('Vui lòng nhập đầy đủ các trường!');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      alert('Mật khẩu mới và xác nhận không khớp!');
      return;
    }

    if (!this.validateNewPassword()) {
      alert('Mật khẩu mới phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt, tối thiểu 8 ký tự!');
      return;
    }

    this.userService.changePassword(this.oldPassword, this.newPassword).subscribe({
      next: (res: any) => {
        alert('Đổi mật khẩu thành công!');
        // Reset form
        this.oldPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      },
      error: (err: any) => {
        console.error('Lỗi đổi mật khẩu:', err);
        alert('Đổi mật khẩu thất bại. Kiểm tra lại mật khẩu cũ hoặc thử lại sau.');
      }
    });
  }

    toggleChangePassword() {
    this.showChangePasswordForm = !this.showChangePasswordForm;
  }

    

  
}

