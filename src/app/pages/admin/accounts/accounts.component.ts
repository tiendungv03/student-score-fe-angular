import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { AccountService } from '../../../core/services/account.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { HttpClientApiService } from '../../../core/services/http-client-api.service';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { TaiKhoan } from '../../../model/tai-khoan.model';

@Component({
  standalone: true,
  selector: 'app-accounts',
  imports: [CommonModule, FormsModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent {
  dataApi: TaiKhoan[] = [];
  filteredData: TaiKhoan[] = [];
  searchText = '';
  form!: FormGroup;
  isEditMode = false;

  constructor(
    private httpClient: HttpClientApiService,
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
    this.httpClient.getAccounts().subscribe({
      next: (data) => {
        // console.log('Danh sách tài khoản:', data);
        this.dataApi = data;
        this.filteredData = [...this.dataApi];
        console.log('acc: ' + JSON.stringify(this.filteredData, null, 2));
      },
      error: (err) => {
        console.error('Lỗi khi tải danh sách tài khoản:', err);
        this.showNotification('Không thể tải danh sách tài khoản', 'error');
      },
    });
  }

  filterAccounts() {
    const search = this.searchText.trim().toLowerCase();
    this.filteredData = this.dataApi.filter((account) => {
      const username = account.tenDangNhap?.toLowerCase() || '';
      const fullName =
        account.sinhVien?.hoTen?.toLowerCase() ||
        account.giangVien?.hoTen?.toLowerCase() ||
        'admin hệ thống';
      const role = account.phanQuyen?.tenQuyen?.toLowerCase() || '';
      return (
        username.includes(search) ||
        fullName.includes(search) ||
        role.includes(search)
      );
    });
  }

  createAccount() {
    const dialogRef = this.dialog.open(CreateAccountComponent, {
      data: {
        mode: 'create',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadAccounts();
    });
  }

  updateAccount(account?: TaiKhoan) {
    const dialogRef = this.dialog.open(UpdateAccountComponent, {
      data: { account },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadAccounts();
    });
  }

  confirmDelete(account: TaiKhoan) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Xác nhận xoá',
        message: `Bạn có chắc muốn xoá tài khoản: ${account.tenDangNhap}?`,
      },
    });
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) this.deleteAccount(account.tenDangNhap);
    });
  }

  deleteAccount(id: string) {
    this.httpClient.deleteAccount(id).subscribe({
      next: () => {
        this.showNotification('Xoá tài khoản thành công!', 'success');

        this.loadAccounts();
      },
      error: () => {
        this.showNotification('Lỗi khi xoá tài khoản!', 'error');
      },
    });
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
