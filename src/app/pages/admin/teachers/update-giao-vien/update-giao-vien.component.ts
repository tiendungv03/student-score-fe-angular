import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientApiService } from '../../../../core/services/http-client-api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Khoa } from '../../../../model/khoa.model';
import { GiangVien } from '../../../../model/giang-vien.model';

@Component({
  selector: 'app-update-giao-vien',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './update-giao-vien.component.html',
  styleUrl: './update-giao-vien.component.scss',
})
export class UpdateGiaoVienComponent {
  updateFormData!: FormGroup;
  public khoas: Khoa[] = [];

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClientApiService,
    private dialogRef: MatDialogRef<UpdateGiaoVienComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { giaoVien?: GiangVien }
  ) {}

  ngOnInit(): void {
    const teacher = this.data?.giaoVien || ({} as GiangVien);

    this.updateFormData = this.fb.group({
      tenDangNhap: [
        { value: teacher.tenDangNhap || '', disabled: true },
        Validators.required,
      ],
      hoTen: [teacher.hoTen || '', Validators.required],
      bomon: [teacher.bomon || '', Validators.required],
      maKhoa: [teacher.maKhoa || '', Validators.required],
    });

    this.httpClient.getDepartments().subscribe({
      next: (data) => (this.khoas = data),
    });
  }

  onSubmit() {
    const updatedData = this.updateFormData.getRawValue();
    const tenDangNhap = this.data?.giaoVien?.tenDangNhap;

    if (tenDangNhap) {
      this.httpClient.putTeacher(tenDangNhap, updatedData).subscribe({
        next: () => {
          this.showNotification('Cập nhật giáo viên thành công!', 'success');
          this.dialogRef.close(true);
        },
        error: () => {
          this.showNotification('Cập nhật giáo viên thất bại!', 'error');
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
