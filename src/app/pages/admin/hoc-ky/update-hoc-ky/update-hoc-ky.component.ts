import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientApiService } from '../../../../core/services/http-client-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { HocTiet } from '../../../../model/hoc-tiet.model';

@Component({
  selector: 'app-update-hoc-ky',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './update-hoc-ky.component.html',
  styleUrl: './update-hoc-ky.component.scss',
})
export class UpdateHocKyComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClientApiService,
    private dialogRef: MatDialogRef<UpdateHocKyComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { hocKi?: any }
  ) {}

  ngOnInit(): void {
    const hk = this.data?.hocKi;

    this.form = this.fb.group({
      maHocKy: [hk?.maHocKy || '', Validators.required],
      namHoc: [hk?.namHoc || '', Validators.required],
      hocKySo: [hk?.hocKySo ?? 1, [Validators.required, Validators.min(1)]],
      ngayBatDauHocKy: [hk?.ngayBatDauHocKy || '', Validators.required],
      ngayKetThucHocKy: [hk?.ngayKetThucHocKy || '', Validators.required],
      trangThai: [hk?.trangThai ?? true],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.showNotification('Vui lòng điền đầy đủ thông tin!', 'warn');
      return;
    }

    const updatedData = this.form.value;
    const maHocKy = this.data?.hocKi?.maHocKy;

    if (maHocKy) {
      this.http.putHoc_ky(maHocKy, updatedData).subscribe({
        next: () => {
          this.showNotification('Cập nhật học kỳ thành công!', 'success');
          this.dialogRef.close(true);
        },
        error: () => {
          this.showNotification('Cập nhật thất bại!', 'error');
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
