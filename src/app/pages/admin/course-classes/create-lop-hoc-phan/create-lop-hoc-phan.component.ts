import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientApiService } from '../../../../core/services/http-client-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Khoa } from '../../../../model/khoa.model';
import { GiangVien } from '../../../../model/giang-vien.model';
import { HocPhan } from '../../../../model/hoc-phan.model';
import { LopHocPhan } from '../../../../model/lop-hoc-phan.model';
import { HocKy } from '../../../../model/hoc-ky.model';

@Component({
  selector: 'app-create-lop-hoc-phan',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-lop-hoc-phan.component.html',
  styleUrl: './create-lop-hoc-phan.component.scss',
})
export class CreateLopHocPhanComponent implements OnInit {
  createFormData!: FormGroup;
  public khoas: Khoa[] = [];
  public hocPhans: HocPhan[] = [];
  public giangViens: GiangVien[] = [];
  private lopHocPhans: LopHocPhan[] = [];
  public hocKys: HocKy[] = [];

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClientApiService,
    private dialogRef: MatDialogRef<CreateLopHocPhanComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: { lopHocPhan?: LopHocPhan; mode?: string }
  ) {}

  ngOnInit(): void {
    this.createFormData = this.fb.group({
      maLopHocPhan: ['', Validators.required],
      maHP: ['', Validators.required],
      tenDangNhapGV: ['', Validators.required],
      maHocKy: ['', Validators.required],
      // siSo: ['', Validators.required],
    });

    this.httpClient.getTeachers().subscribe({
      next: (data) => {
        this.giangViens = data;
      },
    });

    this.httpClient.getLopHocPhans().subscribe({
      next: (data) => {
        this.lopHocPhans = data;
      },
    });

    this.httpClient.getHocPhans().subscribe({
      next: (data) => {
        this.hocPhans = data;
      },
    });

    this.httpClient.getHocKies().subscribe({
      next: (data) => {
        this.hocKys = data;
      },
    });
  }

  onSubmit() {
    const dataForm = this.createFormData.value;

    console.log('dataHPcreate', dataForm);
    const maLopHocPhan = dataForm.maLopHocPhan;

    let itemX = this.lopHocPhans.find((x) => x.maLopHocPhan === maLopHocPhan);
    if (itemX) {
      this.showNotification('Mã lớp học phần đã tồn tại!', 'warn');
      return;
    }

    if (this.createFormData.valid) {
      this.httpClient.postLopHocPhans(dataForm).subscribe({
        next: () => {
          this.showNotification('Đã tạo lớp học phần thành công!', 'success');
          this.createFormData.reset();
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Lỗi khi tạo lỗi học phần:', error);
          this.showNotification('Tạo lớp học phần thất bại!', 'error');
        },
      });
    } else {
      this.showNotification('Vui lòng điền đầy đủ thông tin!', 'warn');
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
