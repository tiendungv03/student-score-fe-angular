import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientApiService } from '../../../../core/services/http-client-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { HocTiet } from '../../../../model/hoc-tiet.model';

@Component({
  selector: 'app-update-tiet-hoc',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './update-tiet-hoc.component.html',
  styleUrls: ['./update-tiet-hoc.component.scss'],
})
export class UpdateTietHocComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClientApiService,
    private dialogRef: MatDialogRef<UpdateTietHocComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { tietHoc?: any }
  ) {}

  ngOnInit(): void {
    const th = this.data?.tietHoc;

    this.form = this.fb.group({
      id: [th?.id || ''],
      thu: [
        th?.thu ?? 1,
        [Validators.required, Validators.min(2), Validators.max(8)],
      ],
      tietDau: [th?.tietDau ?? 1, [Validators.required]],
      tietCuoi: [th?.tietCuoi ?? 1, [Validators.required]],
      thoiGianBatDau: [th?.thoiGianBatDau || '', Validators.required],
      thoiGianKetThuc: [th?.thoiGianKetThuc || '', Validators.required],
    });
  }
  onSubmit() {
    // if (this.form.invalid) {
    //   this.showNotification('Vui lòng điền đầy đủ thông tin!', 'warn');
    //   return;
    // }

    const dataTemp = this.form.value;
    const id = this.data?.tietHoc.id;

    if (id) {
      this.http.putTiet_hoc(id, dataTemp).subscribe({
        next: () => {
          this.showNotification('Cập nhật tiết học thành công!', 'success');
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
