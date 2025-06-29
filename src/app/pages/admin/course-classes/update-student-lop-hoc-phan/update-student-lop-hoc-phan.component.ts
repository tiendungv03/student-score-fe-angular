import { Component, InjectionToken, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientApiService } from '../../../../core/services/http-client-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Khoa } from '../../../../model/khoa.model';
import { KetQuaHocTap } from '../../../../model/ket-qua-hoc-tap.model';
import { HocPhan } from '../../../../model/hoc-phan.model';
import { LopHocPhan } from '../../../../model/lop-hoc-phan.model';
import { HocKy } from '../../../../model/hoc-ky.model';

@Component({
  selector: 'app-update-student-lop-hoc-phan',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-student-lop-hoc-phan.component.html',
  styleUrl: './update-student-lop-hoc-phan.component.scss',
})
export class UpdateStudentLopHocPhanComponent {
  updateFormData!: FormGroup;
  // public khoas: Khoa[] = [];
  // public hocPhans: HocPhan[] = [];
  // public giangViens: GiangVien[] = [];
  // private lopHocPhans: LopHocPhan[] = [];
  // public hocKys: HocKy[] = [];
  private ketQuaHocTap: KetQuaHocTap[] = [];
  public tenSV: string = '';
  private maLop: string = '';
  private maHK: string = '';

  public dataInputDialog?: KetQuaHocTap[];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClientApiService,
    private dialogRef: MatDialogRef<UpdateStudentLopHocPhanComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { KetQuaHocTap?: KetQuaHocTap }
  ) {
    this.tenSV = this.data.KetQuaHocTap?.tenDangNhapSV ?? '';
    this.maLop = this.data.KetQuaHocTap?.maLopHocPhan ?? '';
    this.maHK = this.data.KetQuaHocTap?.maHocKy ?? '';
  }

  ngOnInit(): void {
    this.updateFormData = this.fb.group({
      tenSV: [{ value: this.tenSV, disabled: true }],
      diemQT: [
        '',
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
      diemThi: [
        '',
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
    });

    this.httpClient
      .getKetQuaHocTapById(this.tenSV, this.maLop, this.maHK)
      .subscribe({
        next: (data) => {
          this.ketQuaHocTap = data;
          console.log('data', this.ketQuaHocTap);
        },
      });
  }

  onSubmit() {
    const daXoa = this.data.KetQuaHocTap?.trangThai;
    if (!daXoa) {
      this.showNotification(
        'Sinh viên này đã bị xóa không thể cập nhật điểm',
        'warn'
      );
      return;
    }

    const updatedData = {
      diemQT: this.updateFormData.value.diemQT,
      diemThi: this.updateFormData.value.diemThi,
    };

    console.log('updateData', updatedData);

    if (updatedData) {
      const isMissingInfo = !(this.tenSV && this.maLop && this.maHK);
      if (isMissingInfo) {
        this.showNotification('Không thấy thông tin để cập nhật!', 'error');
        return;
      }

      this.httpClient
        .putKetQuaHocTap(this.tenSV, this.maLop, this.maHK, updatedData)
        .subscribe({
          next: () => {
            this.showNotification(
              'Cập nhật điểm cho sinh viên thành công!',
              'success'
            );
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error('Lỗi khi cập nhật điểm sinh viên:', error);
            this.showNotification(
              'Có lỗi xảy ra khi cập nhật điểm. Vui lòng thử lại sau!',
              'error'
            );
          },
        });
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
