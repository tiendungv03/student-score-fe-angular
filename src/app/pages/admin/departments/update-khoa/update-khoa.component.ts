import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientApiService } from '../../../../core/services/http-client-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Khoa } from '../../../../model/khoa.model';

@Component({
  selector: 'app-update-khoa',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './update-khoa.component.html',
  styleUrl: './update-khoa.component.scss',
})
export class UpdateKhoaComponent implements OnInit {
  updateFormData!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClientApiService,
    private dialogRef: MatDialogRef<UpdateKhoaComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { khoa?: Khoa }
  ) {}

  ngOnInit(): void {
    const Khoa = this.data?.khoa;

    this.updateFormData = this.fb.group({
      makhoa: [Khoa?.makhoa || '', Validators.required],
      tenKhoa: [Khoa?.tenKhoa || '', Validators.required],
      mota: [Khoa?.mota || '', Validators.required],
      trangThai: [Khoa?.trangThai ?? true],
    });
  }

  onSubmit() {
    if (this.updateFormData.invalid) {
      this.showNotification('Vui lòng điền đầy đủ thông tin!', 'warn');
      return;
    }

    const dataTemp = this.updateFormData.value;
    const makhoa = this.data?.khoa?.makhoa;

    if (makhoa) {
      this.httpClient.updateDepartments(makhoa, dataTemp).subscribe({
        next: () => {
          this.showNotification('Cập nhật khoa thành công!', 'success');
          this.dialogRef.close(true);
        },
        error: () => {
          this.showNotification('Cập nhật khoa thất bại!', 'error');
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
