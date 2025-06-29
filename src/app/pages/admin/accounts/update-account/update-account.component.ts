import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { AccountService } from '../../../../core/services/account.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaiKhoan } from '../../../../model/tai-khoan.model';
import { HttpClientApiService } from '../../../../core/services/http-client-api.service';

@Component({
  selector: 'app-update-account',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './update-account.component.html',
  styleUrl: './update-account.component.scss',
})
export class UpdateAccountComponent {
  accountForm!: FormGroup;
  hidePassword: boolean = true;
  constructor(
    private fb: FormBuilder,
    private accountService: HttpClientApiService,
    private dialogRef: MatDialogRef<UpdateAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { account?: TaiKhoan },
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      tenDangNhap: [this.data?.account?.tenDangNhap || '', Validators.required],
      matKhau: [this.data?.account?.matKhau || '', Validators.required],
      idPhanQuyen: [this.data?.account?.idPhanQuyen || '', Validators.required],
      trangThai: [this.data?.account?.trangThai ?? true],
      ngayTao: [this.data?.account?.ngayTao ?? Date, Validators.required],
      ngayHetHan: [this.data?.account?.ngayHetHan ?? Date, Validators.required],
    });
  }

  onSubmit() {
    const account: TaiKhoan = this.accountForm.value;
    console.log('update', account);
    const tenDangNhap = this.data?.account?.tenDangNhap;

    if (tenDangNhap) {
      this.accountService.updateAccount(tenDangNhap, account).subscribe(() => {
        this.showNotification('Cập nhật tài khoản thành công!', 'success');
        this.dialogRef.close(true);
      });
    } else {
      this.showNotification('Tên đăng nhập không hợp lệ.', 'error');
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
