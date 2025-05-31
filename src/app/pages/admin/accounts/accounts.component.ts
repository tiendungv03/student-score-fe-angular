import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '../../../core/services/account.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';

// import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  standalone: true,
  selector: 'app-accounts',
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent {
  accounts: any[] = [];
  filteredAccounts: any[] = [];
  searchText = '';
  form!: FormGroup;
  isEditMode = false;

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadAccounts();
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      // id: [''],
      // username: ['', Validators.required],
      // password: ['', Validators.required],
      // role: ['', Validators.required],
    });
  }

  loadAccounts() {
    this.accountService.getAccounts().subscribe({
      next: (data) => {
        console.log('Danh sách tài khoản:', data);
        this.accounts = data;
        this.filteredAccounts = data; // Khởi tạo danh sách đã lọc
      },
      error: (err) => {
        console.error('Lỗi khi tải danh sách tài khoản:', err);
        this.snackBar.open('Không thể tải danh sách tài khoản', 'Đóng', {
          duration: 2000,
        });
      },
    });
  }

  filterAccounts() {
    const text = this.searchText.toLowerCase();
    this.filteredAccounts = this.accounts.filter((a) =>
      a.username.toLowerCase().includes(text)
    );
  }

  openForm(account?: any) {
    // this.isEditMode = !!account;
    // this.form.reset();
    // if (this.isEditMode) {
    //   this.form.patchValue(account);
    // }
    // const dialogRef = this.dialog.open(FormDialogComponent, {
    //   width: '400px',
    //   data: this.form,
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.isEditMode ? this.updateAccount() : this.createAccount();
    //   }
    // });
  }

  createAccount() {
    // this.accountService.create(this.form.value).subscribe({
    //   next: () => {
    //     this.snackBar.open('Thêm tài khoản thành công', 'Đóng', { duration: 2000 });
    //     this.loadAccounts();
    //   },
    //   error: () => this.snackBar.open('Lỗi khi thêm tài khoản', 'Đóng'),
    // });
  }

  updateAccount() {
    // this.accountService.update(this.form.value.id, this.form.value).subscribe({
    //   next: () => {
    //     this.snackBar.open('Cập nhật tài khoản thành công', 'Đóng', { duration: 2000 });
    //     this.loadAccounts();
    //   },
    //   error: () => this.snackBar.open('Lỗi khi cập nhật', 'Đóng'),
    // });
  }

  confirmDelete(account: any) {
    // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //   data: {
    //     title: 'Xác nhận xoá',
    //     message: `Bạn có chắc muốn xoá tài khoản ${account.username}?`,
    //   },
    // });
    // dialogRef.afterClosed().subscribe((confirmed) => {
    //   if (confirmed) this.deleteAccount(account.id);
    // });
  }

  deleteAccount(id: string) {
    // this.accountService.delete(id).subscribe({
    //   next: () => {
    //     this.snackBar.open('Xoá thành công', 'Đóng', { duration: 2000 });
    //     this.loadAccounts();
    //   },
    //   error: () => this.snackBar.open('Lỗi khi xoá', 'Đóng'),
    // });
  }

  viewAccount(account: any) {
    const hoTen =
      account.giangVien?.hoTen || account.sinhVien?.hoTen || 'Admin hệ thống';
    const role = account.phanQuyen?.tenQuyen || 'Không xác định';
    const message = `Tên đăng nhập: ${account.tenDangNhap}
Họ tên: ${hoTen}
Vai trò: ${role}
Trạng thái: ${account.trangThai ? 'Hoạt động' : 'Bị khóa'}`;

    this.snackBar.open(message, 'Đóng', {
      duration: 4000,
      verticalPosition: 'top',
    });
  }
}
