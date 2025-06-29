import { Component, OnInit } from '@angular/core';
import { HttpClientApiService } from '../../../core/services/http-client-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KetQuaHocTap } from '../../../model/ket-qua-hoc-tap.model';
import { CommonModule } from '@angular/common';
import { delay } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dang-ky-lop-hoc-phan',
  imports: [CommonModule],
  templateUrl: './dang-ky-lop-hoc-phan.component.html',
  styleUrl: './dang-ky-lop-hoc-phan.component.scss',
})
export class DangKyLopHocPhanComponent implements OnInit {
  tenDangNhapSV: string | null = localStorage.getItem('userName');
  danhSachHocPhan: any[] = [];
  danhSachLop: any[] = [];
  daDangKy: any[] = [];

  constructor(
    private http: HttpClientApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (!this.tenDangNhapSV) {
      this.showNotification('Không tìm thấy tài khoản sinh viên!', 'error');
      return;
    }

    this.loadDanhSachHocPhan();
    this.loadDanhSachLop();
    this.loadDaDangKy();
  }

  loadDanhSachHocPhan() {
    this.http.getHoc_phan().subscribe({
      next: (data) => {
        this.danhSachHocPhan = data;
        this.loadDanhSachLop();
      },
      error: () => {
        this.showNotification('Lỗi khi tải danh sách học phần', 'error');
      },
    });
  }

  loadDanhSachLop() {
    // const maHPx =
    this.danhSachLop = [];

    this.danhSachHocPhan.forEach((x) => {
      this.http.getSinh_Vien_LopHocPhan(x.maHP).subscribe({
        next: (data) => {
          this.danhSachLop = [...this.danhSachLop, ...data];
        },
        error: () => {
          this.showNotification('Lỗi khi tải danh sách lớp học phần', 'error');
        },
      });
    });
  }

  loadDaDangKy() {
    // Giả sử API trả về danh sách lớp đã đăng ký
    // this.http.getKet_qua_hoc_tap().subscribe((data) => {
    //   this.daDangKy = data;
    //   console.log('daDangKy', this.daDangKy);
    // });

    this.http.getThoi_khoa_bieu().subscribe({
      next: (data) => {
        this.daDangKy = data;
        console.log('daDangKy', this.daDangKy);
      },
      error: () => {
        this.snackBar.open('Không thể tải kết quả học tập', 'Đóng', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
      },
    });

    // this.http
    //   .getThoi_khoa_bieu()
    //   .pipe(delay(500))
    //   .subscribe({
    //     next: (data) => {
    //       this.daDangKy = [...data];
    //       console.log('daDangKy', this.daDangKy);
    //     },
    //   });
  }

  dangKy(lop: any) {
    const payload = {
      tenDangNhapSV: this.tenDangNhapSV,
      maLopHocPhan: lop.maLopHocPhan,
      maHocKy: lop.maHocKy,
    };

    const maLopHocPhan = lop.maLopHocPhan;
    console.log('kiem tra ma', maLopHocPhan);

    const daDangKy = this.daDangKy.some(
      (x) => x.maLopHocPhan === payload.maLopHocPhan
    );

    console.log('da dang ky', daDangKy);

    if (daDangKy) {
      this.showNotification('Bạn đã đăng ký lớp học phần này rồi.', 'warn');
      return;
    }

    this.http.postKetQuaHocTap(payload).subscribe({
      next: () => {
        this.showNotification('Đăng ký thành công', 'success');
        this.loadDaDangKy();
      },
      error: (err: HttpErrorResponse) => {
        const msg = err.error || err.error?.message || err.message;

        if (msg.includes('đăng ký lớp học phần')) {
          this.showNotification('Bạn đã đăng ký lớp học phần này rồi.', 'warn');
        } else if (
          msg.includes('Xung đột lịch học') ||
          msg.includes('xung đột lịch học')
        ) {
          this.showNotification('Lịch học bị trùng với lớp khác!', 'error');
        } else {
          this.showNotification(`Đăng ký thất bại: ${msg}`, 'error');
        }
      },
    });

    // this.http.postKetQuaHocTap(payload).subscribe({
    //   next: () => {
    //     this.showNotification('Đăng ký thành công', 'success');
    //     this.loadDaDangKy();
    //   },
    //   error: (err) => {
    //     const errorMsg = typeof err.error === 'string' ? err.error : '';

    //     if (errorMsg.includes('đăng ký lớp học phần')) {
    //       this.showNotification('Bạn đã đăng ký lớp học phần này rồi.', 'warn');
    //     } else if (errorMsg.includes('xung đột lịch học')) {
    //       this.showNotification('Lịch học bị trùng với lớp khác!', 'error');
    //     } else {
    //       this.showNotification('Đăng ký thất bại!', 'error');
    //     }
    //   },
    // });
  }

  isDaDangKy(lop: any): boolean {
    return this.daDangKy.some(
      (x) => x.maLopHocPhan === lop.maLopHocPhan && x.maHocKy === lop.maHocKy
    );
  }

  huyDangKy(lop: any) {
    // this.http
    //   .delete(`/api/sinhvien/KetQuaHocTap/huy/${lop.maLopHocPhan}`)
    //   .subscribe({
    //     next: () => {
    //       this.snackBar.open('Hủy đăng ký thành công', 'Đóng', {
    //         duration: 3000,
    //       });
    //       this.loadDaDangKy();
    //     },
    //     error: () => {
    //       this.snackBar.open('Hủy thất bại', 'Đóng', { duration: 3000 });
    //     },
    //   });
  }

  showNotification(
    message: string,
    type: 'success' | 'error' | 'info' | 'warn'
  ) {
    this.snackBar.open(message, 'Đóng', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [`snackbar-${type}`],
    });
  }
}
