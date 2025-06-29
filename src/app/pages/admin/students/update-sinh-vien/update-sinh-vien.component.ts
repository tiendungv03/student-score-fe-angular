import { Component, Inject, OnInit, LOCALE_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localeVi from '@angular/common/locales/vi';
import { Khoa } from '../../../../model/khoa.model';
import { SinhVien } from '../../../../model/sinh-vien.model';
import { HttpClientApiService } from '../../../../core/services/http-client-api.service';

registerLocaleData(localeVi);

@Component({
  selector: 'app-update-sinh-vien',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-sinh-vien.component.html',
  styleUrl: './update-sinh-vien.component.scss',
  providers: [{ provide: LOCALE_ID, useValue: 'vi' }],
})
export class UpdateSinhVienComponent implements OnInit {
  updateFormData!: FormGroup;
  khoas: Khoa[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClientApiService,
    private dialogRef: MatDialogRef<UpdateSinhVienComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { SinhVien?: SinhVien }
  ) {}

  ngOnInit(): void {
    const student: SinhVien = this.data?.SinhVien || ({} as SinhVien);

    this.updateFormData = this.fb.group({
      tenDangNhap: [
        { value: student.tenDangNhap || '', disabled: true },
        Validators.required,
      ],
      hoTen: [
        student.hoTen || '',
        [Validators.required, Validators.minLength(2)],
      ],
      ngaySinh: [
        student.ngaySinh
          ? new Date(student.ngaySinh).toISOString().substring(0, 10)
          : '',
        Validators.required,
      ],
      gioiTinh: [student.gioiTinh ?? true, Validators.required],
      lop: [student.lop || '', [Validators.required, Validators.minLength(3)]],
      maKhoa: [student.maKhoa || '', Validators.required],
    });

    this.loading = true;
    this.httpClient.getDepartments().subscribe({
      next: (data) => {
        this.khoas = data.items;
        this.loading = false;
      },
      error: (error) => {
        console.error('Lỗi khi tải khoa:', error);
        this.loading = false;
      },
    });
  }

  onSubmit() {
    if (this.updateFormData.invalid) {
      this.updateFormData.markAllAsTouched();
      return;
    }

    const updatedData = this.updateFormData.getRawValue();
    const tenDangNhap = this.data?.SinhVien?.tenDangNhap;

    if (tenDangNhap) {
      this.httpClient.putStudent(tenDangNhap, updatedData).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Lỗi khi cập nhật sinh viên:', error);
        },
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
