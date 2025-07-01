import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientApiService } from '../../../../core/services/http-client-api.service';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import localeVi from '@angular/common/locales/vi';
import { SinhVien } from '../../../../model/sinh-vien.model';
import { LopHocPhan } from '../../../../model/lop-hoc-phan.model';
import { KetQuaHocTap } from '../../../../model/ket-qua-hoc-tap.model';
import { AddStudentLopHocPhanComponent } from '../add-student-lop-hoc-phan/add-student-lop-hoc-phan.component';
import { UpdateStudentLopHocPhanComponent } from '../update-student-lop-hoc-phan/update-student-lop-hoc-phan.component';

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
  dataApi!: LopHocPhan;
  filteredData: LopHocPhan[] = [];
  public sinhVienLop: SinhVien[] = [];
  searchText = '';
  loading = false;
  maLopHocPhan!: string;
  maHocKy!: string;

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
    this.route.paramMap.subscribe((params) => {
      this.maLopHocPhan = params.get('maLopHocPhan')!;
      this.maHocKy = params.get('maHocKy')!;
    });
    if (!this.maLopHocPhan) {
      this.router.navigate(['/admin/course-classes']);
      return;
    }

    this.loading = true;
    if (this.maLopHocPhan) {
      this.httpClient
        .getByLopHocPhan(this.maLopHocPhan, this.maHocKy)
        .subscribe({
          next: (data: LopHocPhan) => {
            this.dataApi = data;
            this.filteredData = [data]; // ← Chuyển object về array

            const tensv =
              data.ketQuaHocTaps?.map((kq) => kq.tenDangNhapSV) ?? [];

            if (tensv.length === 0) {
              this.sinhVienLop = [];
              this.loading = false;
              return;
            }

            const calls = tensv.map((id) =>
              this.httpClient.getSinhVienById(id).toPromise()
            );

            Promise.all(calls)
              .then((sinhViens: SinhVien[]) => {
                this.sinhVienLop = sinhViens;
                this.loading = false;
              })
              .catch((err) => {
                console.error('Lỗi khi tải danh sách sinh viên:', err);
                this.loading = false;
              });
          },
          error: (error) => {
            console.error('Lỗi khi tải lớp học phần:', error);
            this.showNotification('Tải danh sách sinh viên thất bại', 'error');
            this.loading = false;
          },
        });
    }
  }

  filterData() {
    // const text = this.searchText.toLowerCase().trim();
    // this.filteredData = this.dataApi.filter((item) =>
    //   item.maHP.toLowerCase().includes(text)
    // );
  }

  createSinhVien() {
    const dialogRef = this.dialog.open(AddStudentLopHocPhanComponent, {
      data: {
        mode: 'create',
        maLopHocPhan: this.maLopHocPhan,
        maHocKy: this.maHocKy,
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadDataApi();
    });
  }

  updateSinhVien(KetQuaHocTap: KetQuaHocTap) {
    const dialogRef = this.dialog.open(UpdateStudentLopHocPhanComponent, {
      data: { KetQuaHocTap: KetQuaHocTap },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadDataApi();
    });
  }

  confirmDelete(KetQuaHocTap: KetQuaHocTap) {
    const tenSV = KetQuaHocTap.tenDangNhapSV;
    const maLop = KetQuaHocTap.maLopHocPhan;
    const maHK = KetQuaHocTap.maHocKy;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Xác nhận xóa',
        message: `Bạn có chắc muốn xóa sinh viên: ${tenSV}?`,
      },
    });
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) this.deleteData(tenSV, maLop, maHK);
    });
  }

  deleteData(tenSV: string, maLop: string, maHK: string) {
    this.httpClient.deleteKetQuaHocTap(tenSV, maLop, maHK).subscribe({
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
