// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatDialog } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { HttpClientApiService } from '../../../core/services/http-client-api.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { CreateSinhVienComponent } from './create-sinh-vien/create-sinh-vien.component';
// import { UpdateSinhVienComponent } from './update-sinh-vien/update-sinh-vien.component';
// import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-students',
//   imports: [CommonModule, FormsModule],
//   templateUrl: './students.component.html',
//   styleUrl: './students.component.scss',
// })
// export class StudentsComponent {
//   dataApi: any[] = [];
//   filteredData: any[] = [];
//   searchText = '';

//   constructor(
//     private httpClient: HttpClientApiService,
//     private fb: FormBuilder,
//     private dialog: MatDialog,
//     private snackBar: MatSnackBar,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     this.loadDataApi();
//   }

//   loadDataApi() {
//     this.httpClient.getStudents().subscribe({
//       next: (data) => {
//         // console.log('data api: ' + data);
//         // const tamp: any = data;
//         // console.log('data api:', JSON.stringify(data, null, 2));
//         this.dataApi = data;

//         this.filteredData = [...this.dataApi];
//         // console.log('dtf: ' + this.filteredData);
//         // console.log('Sinh vien: ' + JSON.stringify(this.filteredData, null, 2));
//       },
//       error: (error) => {
//         console.error('Error loading accounts:', error);
//         this.snackBar.open('Failed to load accounts', 'Close', {
//           duration: 3000,
//           panelClass: ['error-snackbar'],
//         });
//       },
//     });
//   }

//   filterData() {
//     const text = this.searchText.toLowerCase();
//     this.filteredData = this.dataApi.filter(
//       (item: any) =>
//         item.taiKhoan?.tenDangNhap?.toLowerCase().includes(text) ||
//         item.tenQuyen?.toLowerCase().includes(text)
//     );
//   }

//   createSinhVien() {
//     const dialogRef = this.dialog.open(CreateSinhVienComponent, {
//       data: {
//         mode: 'create',
//       },
//     });

//     dialogRef.afterClosed().subscribe((result) => {
//       if (result) this.loadDataApi();
//     });
//   }

//   viewSinhVien(sinhVien: any) {
//     this.router.navigate(['/admin/students/', sinhVien.tenDangNhap]);
//   }

//   updateSinhVien(SinhVien?: any) {
//     const dialogRef = this.dialog.open(UpdateSinhVienComponent, {
//       data: { SinhVien },
//     });
//     dialogRef.afterClosed().subscribe((result) => {
//       if (result) this.loadDataApi();
//     });
//   }

//   confirmDelete(SinhVien: any) {
//     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
//       data: {
//         title: 'Xác nhận xoá',
//         message: `Bạn có chắc muốn xoá sinh viên tên: ${SinhVien.hoTen}?`,
//       },
//     });
//     dialogRef.afterClosed().subscribe((confirmed) => {
//       if (confirmed) this.deleteData(SinhVien.tenDangNhap);
//     });
//   }

//   deleteData(tenDangNhap: string) {
//     this.httpClient.deleteStudent(tenDangNhap).subscribe({
//       next: () => {
//         this.snackBar.open('Xoá khoa thành công!', 'Đóng', {
//           duration: 3000,
//           horizontalPosition: 'end',
//           verticalPosition: 'top',
//           panelClass: ['snackbar-success'],
//         });

//         this.loadDataApi();
//       },
//       error: () => {
//         this.snackBar.open('Lỗi khi xoá khoa!', 'Đóng', {
//           duration: 3000,
//           horizontalPosition: 'end',
//           verticalPosition: 'top',
//           panelClass: ['snackbar-error'],
//         });
//       },
//     });
//   }
// }

import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientApiService } from '../../../core/services/http-client-api.service';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateSinhVienComponent } from './create-sinh-vien/create-sinh-vien.component';
import { UpdateSinhVienComponent } from './update-sinh-vien/update-sinh-vien.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import localeVi from '@angular/common/locales/vi';
import { SinhVien } from '../../../model/sinh-vien.model';

registerLocaleData(localeVi);

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
  providers: [{ provide: LOCALE_ID, useValue: 'vi' }],
})
export class StudentsComponent implements OnInit {
  dataApi: SinhVien[] = [];
  filteredData: SinhVien[] = [];
  searchText = '';
  loading = false;

  constructor(
    private httpClient: HttpClientApiService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadDataApi();
  }

  loadDataApi() {
    this.loading = true;
    this.httpClient.getStudents().subscribe({
      next: (data: SinhVien[]) => {
        this.dataApi = data;
        this.filteredData = [...this.dataApi];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading students:', error);
        this.snackBar.open('Tải danh sách sinh viên thất bại', 'Đóng', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
        this.loading = false;
      },
    });
  }

  filterData() {
    const text = this.searchText.toLowerCase().trim();
    this.filteredData = this.dataApi.filter(
      (item) =>
        item.tenDangNhap.toLowerCase().includes(text) ||
        item.hoTen.toLowerCase().includes(text) ||
        item.lop.toLowerCase().includes(text) ||
        item.khoa?.tenKhoa.toLowerCase().includes(text)
    );
  }

  createSinhVien() {
    const dialogRef = this.dialog.open(CreateSinhVienComponent, {
      data: { mode: 'create' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadDataApi();
    });
  }

  viewSinhVien(sinhVien: SinhVien) {
    this.router.navigate(['/admin/students/', sinhVien.tenDangNhap]);
  }

  updateSinhVien(sinhVien: SinhVien) {
    const dialogRef = this.dialog.open(UpdateSinhVienComponent, {
      data: { SinhVien: sinhVien },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadDataApi();
    });
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
        this.snackBar.open('Xóa sinh viên thành công!', 'Đóng', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.loadDataApi();
      },
      error: () => {
        this.snackBar.open('Lỗi khi xóa sinh viên!', 'Đóng', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      },
    });
  }
}
