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
  selector: 'app-them-tiet-hoc',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './them-tiet-hoc.component.html',
  styleUrl: './them-tiet-hoc.component.scss',
})
export class ThemTietHocComponent implements OnInit {
  createFormData!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClientApiService,
    private dialogRef: MatDialogRef<ThemTietHocComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { t: any; mode?: string }
  ) {}

  ngOnInit(): void {
    // const item = this.data?.t.items;

    this.createFormData = this.fb.group({
      id: [''],
      thu: [
        Number,
        [Validators.required, Validators.min(0), Validators.max(7)],
      ],
      tietDau: [0, [Validators.required]],
      tietCuoi: [, [Validators.required]],
      thoiGianBatDau: ['', Validators.required],
      thoiGianKetThuc: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.createFormData.invalid) {
      this.showNotification('Vui lòng điền đầy đủ thông tin!', 'warn');
      return;
    }

    const dataForm = this.createFormData.value;

    this.httpClient.postTiet_hoc(dataForm).subscribe({
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
