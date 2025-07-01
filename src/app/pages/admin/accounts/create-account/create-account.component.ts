import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientApiService } from '../../../../core/services/http-client-api.service';
import { CommonModule } from '@angular/common';
import { TaiKhoan } from '../../../../model/tai-khoan.model';

@Component({
  selector: 'app-create-account',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
})
export class CreateAccountComponent {
  createAccountForm!: FormGroup;
  hidePassword: boolean = true;
  // reMatKhau: string = '';
  reHidePassword = true;
  showMismatchError: boolean = false;
  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClientApiService,
    private dialogRef: MatDialogRef<CreateAccountComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { account?: TaiKhoan; mode?: string }
  ) {}

  ngOnInit(): void {
    this.createAccountForm = this.fb.group(
      {
        tenDangNhap: ['', Validators.required],
        matKhau: ['', Validators.required],
        reMatKhau: ['', Validators.required],
        idPhanQuyen: [0, [Validators.required, Validators.min(1)]],
        ngayTao: [Date, Validators.required],
        ngayHetHan: [Date, Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );

    // if (this.data && this.data.mode === 'create') {
    //   this.createAccountForm.reset();
    // }
  }

  passwordMatchValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('matKhau')?.value;
    const confirmPassword = group.get('reMatKhau')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    const account: TaiKhoan = this.createAccountForm.value;
    // const passUser = this.createAccountForm.get('matKhau')?.value;
    // console.log('create', account);

    // if (passUser != this.reMatKhau) {
    //   this.showMismatchError = true;
    //   return;
    // }

    // this.showMismatchError = false;

    if (account != null) {
      this.httpClient.createAccount(account).subscribe(
        () => {
          this.createAccountForm.reset();
          this.dialogRef.close(true);
          this.showNotification('Thêm tài khoản thành công', 'success');
        },
        (error) => {
          console.error('Error creating account:', error);
          this.showNotification('Lỗi thêm tài khoản', 'error');
        }
      );
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
