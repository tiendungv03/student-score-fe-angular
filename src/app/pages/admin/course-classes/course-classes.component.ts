import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientApiService } from '../../../core/services/http-client-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { LopHocPhan } from '../../../model/lop-hoc-phan.model';
import { KetQuaHocTap } from '../../../model/ket-qua-hoc-tap.model';
import { UpdateLopHocPhanComponent } from './update-lop-hoc-phan/update-lop-hoc-phan.component';
import { CreateLopHocPhanComponent } from './create-lop-hoc-phan/create-lop-hoc-phan.component';
import { Router } from '@angular/router';
import { ViewLopHocPhanComponent } from './view-lop-hoc-phan/view-lop-hoc-phan.component';

@Component({
  selector: 'app-course-classes',
  imports: [CommonModule, FormsModule],
  templateUrl: './course-classes.component.html',
  styleUrl: './course-classes.component.scss',
})
export class CourseClassesComponent {
  dataApi: LopHocPhan[] = [];
  filteredData: LopHocPhan[] = [];
  // public sinhViens:
  fullData: LopHocPhan[] = [];
  pagedData: LopHocPhan[] = [];
  pageIndex = 1;
  pageSize = 10;
  totalCount = 0;

  searchText = '';

  constructor(
    private httpClient: HttpClientApiService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadDataApi();
  }

  loadDataApi() {
    this.httpClient.getLopHocPhans().subscribe({
      next: (res) => {
        // console.log('data api: ' + data);
        // const tamp: any = data;
        // console.log('data api:', JSON.stringify(data, null, 2));
        this.fullData = res.items; // Lưu toàn bộ danh sách
        this.totalCount = res.totalCount;
        this.sliceData();
        // this.totalItems = data.totalCount; // dùng để phân trang
        // console.log('dtf: ' + this.filteredData);
        // console.log('Sinh vien: ' + JSON.stringify(this.filteredData, null, 2));
      },
      error: (error) => {
        console.error('Error loading:', error);
        this.showNotification('Lỗi hiện thị học phần!', 'error');
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
      (item: LopHocPhan) =>
        item.hocPhan?.tenHP.toLowerCase().includes(text) ||
        item.maHP?.toLowerCase().includes(text) ||
        item.maLopHocPhan.toLowerCase().includes(text)
    );
  }

  createLopHocPhan() {
    const dialogRef = this.dialog.open(CreateLopHocPhanComponent, {
      data: {
        mode: 'create',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadDataApi();
    });
  }

  viewLopHocPhan(lopHocPhan: LopHocPhan) {
    this.router.navigate([
      '/admin/course-classes/',
      lopHocPhan.maLopHocPhan,
      lopHocPhan.maHocKy,
    ]);
  }

  updateLopHocPhan(lopHocPhan?: LopHocPhan) {
    const dialogRef = this.dialog.open(UpdateLopHocPhanComponent, {
      data: { lopHocPhan },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadDataApi();
    });
  }

  confirmDelete(lopHocPhan: LopHocPhan) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Xác nhận xoá',
        message: `Bạn có chắc muốn xoá lớp về học phần tên: ${lopHocPhan.hocPhan?.tenHP}? và mã lớp: ${lopHocPhan.maHP}?`,
      },
    });
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) this.deleteData(lopHocPhan.maLopHocPhan);
    });
  }

  deleteData(maLopHocPhan: string) {
    this.httpClient.deleteLopHocPhans(maLopHocPhan).subscribe({
      next: () => {
        this.showNotification('Đã Xoá lớp học phần!', 'success');

        this.loadDataApi();
      },
      error: () => {
        this.showNotification('Lỗi khi xoá lớp học phần!', 'error');
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
