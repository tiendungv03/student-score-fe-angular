import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientApiService } from '../../../core/services/http-client-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CreateGiaoVienComponent } from './create-giao-vien/create-giao-vien.component';
import { UpdateGiaoVienComponent } from './update-giao-vien/update-giao-vien.component';
import { GiangVien } from '../../../model/giang-vien.model';

@Component({
  selector: 'app-teachers',
  imports: [CommonModule, FormsModule],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss',
})
export class TeachersComponent {
  dataApi: GiangVien[] = [];
  filteredData: GiangVien[] = [];
  searchText = '';

  fullData: GiangVien[] = [];
  pagedData: GiangVien[] = [];
  pageIndex = 1;
  pageSize = 10;
  totalCount = 0;
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
    this.httpClient.getTeachers().subscribe({
      next: (data) => {
        // console.log('data api: ' + data);
        // const tamp: any = data;
        // console.log('data api:', JSON.stringify(data, null, 2));

        // this.dataApi = data;
        // this.filteredData = [...this.dataApi];

        this.fullData = data.items;
        this.totalCount = data.totalCount;
        this.sliceData();

        // console.log('dtf: ' + this.filteredData);
        // console.log('Sinh vien: ' + JSON.stringify(this.filteredData, null, 2));
      },
      error: (error) => {
        console.error('Error loading accounts:', error);
        this.showNotification('Failed to load teacher', 'error');
      },
    });
  }

  sliceData() {
    const start = (this.pageIndex - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedData = this.fullData.slice(start, end);
  }

  nextPage() {
    if (this.pageIndex * this.pageSize < this.totalCount) {
      this.pageIndex++;
      this.loadDataApi();
    }
  }

  prevPage() {
    if (this.pageIndex > 1) {
      this.pageIndex--;
      this.loadDataApi();
    }
  }

  onPageChange(newPage: number) {
    this.pageIndex = newPage;
    this.sliceData();
  }

  filterData() {
    const text = this.searchText.toLowerCase();
    this.filteredData = this.dataApi.filter(
      (item: GiangVien) =>
        item.taiKhoan?.tenDangNhap?.toLowerCase().includes(text) ||
        item.hoTen?.toLowerCase().includes(text) ||
        item.bomon.toLowerCase().includes(text) ||
        item.khoa?.tenKhoa.toLowerCase().includes(text)
    );
  }

  createGiaoVien() {
    const dialogRef = this.dialog.open(CreateGiaoVienComponent, {
      data: {
        mode: 'create',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadDataApi();
    });
  }

  viewGiaoVien(giaoVien: GiangVien) {
    this.router.navigate(['/admin/teachers/', giaoVien.tenDangNhap]);
  }

  updateGiaoVien(giaoVien?: GiangVien) {
    const dialogRef = this.dialog.open(UpdateGiaoVienComponent, {
      data: { giaoVien },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadDataApi();
    });
  }

  confirmDelete(giaoVien: GiangVien) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Xác nhận xoá',
        message: `Bạn có chắc muốn xoá sinh viên tên: ${giaoVien.hoTen}?`,
      },
    });
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) this.deleteData(giaoVien.tenDangNhap);
    });
  }

  deleteData(tenDangNhap: string) {
    this.httpClient.deleteStudent(tenDangNhap).subscribe({
      next: () => {
        this.showNotification('Xóa giáo viên thành công', 'success');

        this.loadDataApi();
      },
      error: () => {
        this.showNotification('Lỗi khi xoá giáo viên', 'error');
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
