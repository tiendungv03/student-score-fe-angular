import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientApiService } from '../../../../core/services/http-client-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { TaiKhoan } from '../../../../model/tai-khoan.model';
import { Khoa } from '../../../../model/khoa.model';

@Component({
  selector: 'app-create-giao-vien',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-giao-vien.component.html',
  styleUrl: './create-giao-vien.component.scss',
})
export class CreateGiaoVienComponent implements OnInit {
  createFormData!: FormGroup;
  private user: TaiKhoan[] = [];
  public khoas: Khoa[] = [];
  // private lops: any[] = [];

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClientApiService,
    private dialogRef: MatDialogRef<CreateGiaoVienComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { giaoVien?: any; mode?: string }
  ) {}

  ngOnInit(): void {
    this.createFormData = this.fb.group({
      tenDangNhap: ['', Validators.required],
      hoTen: ['', Validators.required],
      bomon: ['', Validators.required],
      maKhoa: ['', Validators.required],
    });

    this.httpClient.getDepartments().subscribe({
      next: (data) => {
        this.khoas = data.items;
      },
    });

    // this.httpClient.getLopHocPhans().subscribe({
    //   next: (data) => {
    //     this.lops = data;
    //   },
    // });

    this.httpClient.getAccounts().subscribe({
      next: (data) => {
        this.user = data.items;
      },
    });
  }

  onSubmit() {
    const dataForm = this.createFormData.value;
    const tenDangNhap = dataForm.tenDangNhap;

    let itemX = this.user.find((x) => x.tenDangNhap === tenDangNhap);
    if (!itemX) {
      this.showNotification('Tên đăng nhập chưa có tài khoản!', 'warn');
      return;
    }

    if (this.createFormData.valid) {
      this.httpClient.postTeachers(dataForm).subscribe({
        next: () => {
          this.showNotification('Tạo giáo viên thành công!', 'success');
          this.createFormData.reset();
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Lỗi khi tạo giáo viên:', error);
          this.showNotification('Tạo giáo viên thất bại!', 'error');
        },
      });
    } else {
      this.showNotification('Vui lòng điền đầy đủ thông tin!', 'warn');
    }
  }

  onCancel() {
    this.dialogRef.close();
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
