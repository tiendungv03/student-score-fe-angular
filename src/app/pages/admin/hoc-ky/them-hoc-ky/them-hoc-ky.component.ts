import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientApiService } from '../../../../core/services/http-client-api.service';
import { CommonModule } from '@angular/common';
import { Khoa } from '../../../../model/khoa.model';

@Component({
  selector: 'app-them-hoc-ky',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],

  templateUrl: './them-hoc-ky.component.html',
  styleUrl: './them-hoc-ky.component.scss',
})
export class ThemHocKyComponent implements OnInit {
  createFormData!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClientApiService,
    private dialogRef: MatDialogRef<ThemHocKyComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { t: any; mode?: string }
  ) {}

  ngOnInit(): void {
    // const item = this.data?.t.items;

    this.createFormData = this.fb.group({
      maHocKy: ['', Validators.required],
      namHoc: ['', Validators.required],
      hocKySo: [0, [Validators.required]],
      ngayBatDauHocKy: ['', Validators.required],
      ngayKetThucHocKy: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.createFormData.invalid) {
      this.showNotification('Vui lòng điền đầy đủ thông tin!', 'warn');
      return;
    }

    const dataForm = this.createFormData.value;

    this.httpClient.postHoc_ky(dataForm).subscribe({
      next: () => {
        this.showNotification('Tạo khoa thành công!', 'success');
        this.dialogRef.close(true);
      },
      error: () => {
        this.showNotification('Tạo khoa thất bại!', 'error');
      },
    });
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
