import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientApiService } from '../../../core/services/http-client-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateKhoaComponent } from './create-khoa/create-khoa.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { UpdateKhoaComponent } from './update-khoa/update-khoa.component';
import { Khoa } from '../../../model/khoa.model';

@Component({
  selector: 'app-departments',
  imports: [CommonModule, FormsModule],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss',
})
export class DepartmentsComponent {
  dataApi: Khoa[] = [];
  filteredData: Khoa[] = [];
  loading = true;
  error?: string;
  searchText = '';

  fullData: Khoa[] = [];
  pagedData: Khoa[] = [];
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
    this.httpClient.getDepartments().subscribe({
      next: (data) => {
        // console.log('data api: ' + data);
        // const tamp: any = data;
        // console.log('data api:', JSON.stringify(data, null, 2));
        // this.dataApi = data;

        // this.filteredData = [...this.dataApi];
        // console.log('dtf: ' + this.filteredData);
        // console.log('khoa: ' + JSON.stringify(this.filteredData, null, 2));

        this.fullData = data.items;
        this.totalCount = data.totalCount;
        this.sliceData();
        this.loading = false;
      },
      error: (error) => {
        console.error('Lỗi khi tải danh sách khoa:', error);
        this.error = 'Không thể tải danh sách khoa';
        this.loading = false;
        this.showNotification('Không thể tải danh sách khoa', 'error');
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
      (item: Khoa) =>
        item.tenKhoa?.toLowerCase().includes(text) ||
        item.makhoa?.toLowerCase().includes(text)
    );
  }

  createKhoa() {
    const dialogRef = this.dialog.open(CreateKhoaComponent, {
      data: {
        mode: 'create',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadDataApi();
    });
  }

  updateKhoa(khoa?: Khoa) {
    const dialogRef = this.dialog.open(UpdateKhoaComponent, {
      data: { khoa },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadDataApi();
    });
  }

  confirmDelete(khoas: Khoa) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Xác nhận xoá',
        message: `Bạn có chắc muốn xoá khoa: ${khoas.tenKhoa}?`,
      },
    });
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) this.deleteData(khoas.makhoa);
    });
  }

  deleteData(makhoa: string) {
    this.httpClient.deleteDepartments(makhoa).subscribe({
      next: () => {
        this.showNotification('Xoá khoa thành công!', 'success');

        this.loadDataApi();
      },
      error: () => {
        this.showNotification('Lỗi khi xoá khoa!', 'error');
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
