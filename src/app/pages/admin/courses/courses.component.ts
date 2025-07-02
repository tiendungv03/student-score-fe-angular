import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientApiService } from '../../../core/services/http-client-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { HocPhan } from '../../../model/hoc-phan.model';
import { CreateHocPhanComponent } from './create-hoc-phan/create-hoc-phan.component';
import { UpdateHocPhanComponent } from './update-hoc-phan/update-hoc-phan.component';

@Component({
  standalone: true,
  selector: 'app-courses',
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  dataApi: HocPhan[] = [];
  // filteredData: HocPhan[] = [];
  searchText = '';

  fullData: HocPhan[] = [];
  pagedData: HocPhan[] = [];
  pageIndex = 1;
  pageSize = 10;
  totalCount = 0;

  constructor(
    private httpClient: HttpClientApiService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadDataApi();
  }

  loadDataApi() {
    this.httpClient.getHocPhans().subscribe({
      next: (data) => {
        this.dataApi = data.items; // ← Gán thêm dòng này
        this.fullData = [...this.dataApi];
        this.totalCount = this.fullData.length;
        this.pageIndex = 1;
        this.sliceData();
      },
      error: (error) => {
        console.error('Error loading:', error);
        this.showNotification('Lỗi hiện thị học phần!', 'error');
      },
    });
  }

  // loadDataApi() {
  //   this.httpClient.getHocPhans().subscribe({
  //     next: (data) => {
  //       this.fullData = data.items;
  //       this.totalCount = data.totalCount;
  //       this.sliceData();
  //       // console.log('data api: ' + data);
  //       // const tamp: any = data;
  //       // console.log('data api:', JSON.stringify(data, null, 2));
  //       // this.dataApi = data;

  //       // this.filteredData = [...this.dataApi];
  //       // console.log('dtf: ' + this.filteredData);
  //       // console.log('Sinh vien: ' + JSON.stringify(this.filteredData, null, 2));
  //     },
  //     error: (error) => {
  //       console.error('Error loading accounts:', error);
  //       this.showNotification('Lỗi hiện thị học phần!', 'error');
  //     },
  //   });
  // }

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
    const text = this.searchText.toLowerCase().trim();

    if (!text) {
      this.fullData = [...this.dataApi];
    } else {
      this.fullData = this.dataApi.filter((item: HocPhan) => {
        const tenHP = item.tenHP?.toLowerCase() || '';
        const maHP = item.maHP?.toLowerCase() || '';
        const soTinChi = item.soTinChi?.toString() || '';
        const batBuoc = item.batBuoc ? 'bắt buộc' : 'không bắt buộc';
        const khoa = item.khoa?.tenKhoa?.toLowerCase() || '';
        const trangThai = item.trangThai ? 'hoạt động' : 'bị xóa';

        return (
          tenHP.includes(text) ||
          maHP.includes(text) ||
          soTinChi.includes(text) ||
          batBuoc.includes(text) ||
          khoa.includes(text) ||
          trangThai.includes(text)
        );
      });
    }

    this.totalCount = this.fullData.length;
    this.pageIndex = 1;
    this.sliceData();
  }

  createHocPhan() {
    const dialogRef = this.dialog.open(CreateHocPhanComponent, {
      data: {
        mode: 'create',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadDataApi();
    });
  }

  // viewHocPhan(sinhVien: any) {
  //   this.router.navigate(['/admin/students/', sinhVien.tenDangNhap]);
  // }

  updateHocPhan(hocPhan?: HocPhan) {
    const dialogRef = this.dialog.open(UpdateHocPhanComponent, {
      data: { hocPhan },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadDataApi();
    });
  }

  confirmDelete(hocPhans: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Xác nhận xoá',
        message: `Bạn có chắc muốn xoá học phần tên: ${hocPhans.tenHP}?`,
      },
    });
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) this.deleteData(hocPhans.maHP);
    });
  }

  deleteData(maHP: string) {
    this.httpClient.deleteHocPhans(maHP).subscribe({
      next: () => {
        this.showNotification('Xoá học phần thành công!', 'success');

        this.loadDataApi();
      },
      error: () => {
        this.showNotification('Lỗi khi xoá học phần!', 'error');
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
