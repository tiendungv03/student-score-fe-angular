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
  selector: 'app-create-khoa',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-khoa.component.html',
  styleUrl: './create-khoa.component.scss',
})
export class CreateKhoaComponent implements OnInit {
  createFormData!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClientApiService,
    private dialogRef: MatDialogRef<CreateKhoaComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { khoa?: Khoa; mode?: string }
  ) {}

  ngOnInit(): void {
    this.createFormData = this.fb.group({
      makhoa: ['', Validators.required],
      tenKhoa: ['', Validators.required],
      mota: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.createFormData.invalid) {
      this.showNotification('Vui lòng điền đầy đủ thông tin!', 'warn');
      return;
    }

    const dataForm = this.createFormData.value;

    this.httpClient.createDepartments(dataForm).subscribe({
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
