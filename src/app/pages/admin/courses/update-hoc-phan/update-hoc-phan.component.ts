import { Component, Inject, OnInit, LOCALE_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localeVi from '@angular/common/locales/vi';
import { Khoa } from '../../../../model/khoa.model';
import { HocPhan } from '../../../../model/hoc-phan.model';
import { HttpClientApiService } from '../../../../core/services/http-client-api.service';

@Component({
  selector: 'app-update-hoc-phan',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-hoc-phan.component.html',
  styleUrl: './update-hoc-phan.component.scss',
})
export class UpdateHocPhanComponent implements OnInit {
  updateFormData!: FormGroup;
  khoas: Khoa[] = [];
  loading = false;
  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClientApiService,
    private dialogRef: MatDialogRef<UpdateHocPhanComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { hocPhan?: HocPhan }
  ) {}

  ngOnInit(): void {
    const hocPhan: HocPhan = this.data?.hocPhan || ({} as HocPhan);

    this.updateFormData = this.fb.group({
      maHP: [hocPhan.maHP || '', Validators.required],
      tenHP: [
        hocPhan.tenHP || '',
        [Validators.required, Validators.minLength(2)],
      ],
      soTinChi: [hocPhan.soTinChi || '', Validators.required],
      batBuoc: [hocPhan.batBuoc ?? true, Validators.required],
      maKhoa: [hocPhan.maKhoa || '', Validators.required],
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
    const maHocPhan = this.data?.hocPhan?.maHP;

    if (updatedData) {
      if (!maHocPhan) {
        this.showNotification(
          'Không tìm thấy mã học phần để cập nhật!',
          'error'
        );
        return;
      }
      this.httpClient.putHocPhans(maHocPhan, updatedData).subscribe({
        next: () => {
          this.showNotification('Đã cập nhật học phần!', 'success');
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Lỗi khi cập nhật học phần:', error);
          this.showNotification('Lỗi khi cập nhật học phần!', 'error');
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
