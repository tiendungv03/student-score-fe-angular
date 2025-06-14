import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientApiService } from '../../../../core/services/http-client-api.service';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { CreateSinhVienComponent } from './create-sinh-vien/create-sinh-vien.component';
// import { UpdateSinhVienComponent } from './update-sinh-vien/update-sinh-vien.component';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import localeVi from '@angular/common/locales/vi';
import { SinhVien } from '../../../../model/sinh-vien.model';
import { LopHocPhan } from '../../../../model/lop-hoc-phan.model';

@Component({
  selector: 'app-view-lop-hoc-phan',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './view-lop-hoc-phan.component.html',
  styleUrl: './view-lop-hoc-phan.component.scss',
})
export class ViewLopHocPhanComponent implements OnInit {
  dataApi: LopHocPhan[] = [];
  filteredData: LopHocPhan[] = [];
  searchText = '';
  loading = false;

  constructor(
    private httpClient: HttpClientApiService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadDataApi();
  }

  loadDataApi() {
    const maLopHocPhan = this.route.snapshot.paramMap.get('id');
    if (!maLopHocPhan) {
      this.router.navigate(['/admin/course-classes']);
      return;
    }

    this.loading = true;
    if (maLopHocPhan) {
      this.httpClient.getByLopHocPhan(maLopHocPhan).subscribe({
        next: (data: LopHocPhan[]) => {
          this.dataApi = data;
          this.filteredData = this.dataApi;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading students:', error);
          this.showNotification('Tải danh sách sinh viên thất bại', 'error');
          this.loading = false;
        },
      });
    }
  }

  filterData() {
    const text = this.searchText.toLowerCase().trim();
    this.filteredData = this.dataApi.filter((item) =>
      item.maHP.toLowerCase().includes(text)
    );
  }

  updateSinhVien(sinhVien: SinhVien) {
    // const dialogRef = this.dialog.open(UpdateSinhVienComponent, {
    //   data: { SinhVien: sinhVien },
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) this.loadDataApi();
    // });
  }

  confirmDelete(sinhVien: SinhVien) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Xác nhận xóa',
        message: `Bạn có chắc muốn xóa sinh viên ${sinhVien.hoTen}?`,
      },
    });
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) this.deleteData(sinhVien.tenDangNhap);
    });
  }

  deleteData(tenDangNhap: string) {
    this.httpClient.deleteStudent(tenDangNhap).subscribe({
      next: () => {
        this.showNotification('Đã xóa sinh viên ra khỏi lớp!', 'success');
        this.loadDataApi();
      },
      error: () => {
        this.showNotification('Lỗi khi xóa sinh viên!', 'error');
      },
    });
  }

  goBack() {
    this.router.navigate(['/admin/course-classes']);
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
