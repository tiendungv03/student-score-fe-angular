import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientApiService } from '../../../../core/services/http-client-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Khoa } from '../../../../model/khoa.model';
import { GiangVien } from '../../../../model/giang-vien.model';
import { HocPhan } from '../../../../model/hoc-phan.model';
import { LopHocPhan } from '../../../../model/lop-hoc-phan.model';
import { HocKy } from '../../../../model/hoc-ky.model';

@Component({
  selector: 'app-add-student-lop-hoc-phan',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-student-lop-hoc-phan.component.html',
  styleUrl: './add-student-lop-hoc-phan.component.scss',
})
export class AddStudentLopHocPhanComponent {
  createFormData!: FormGroup;
  public khoas: Khoa[] = [];
  public hocPhans: HocPhan[] = [];
  public giangViens: GiangVien[] = [];
  private lopHocPhans: LopHocPhan[] = [];
  public hocKys: HocKy[] = [];

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClientApiService,
    private dialogRef: MatDialogRef<AddStudentLopHocPhanComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: { mode: string; maLopHocPhan: string; maHocKy: string }
  ) {}

  ngOnInit(): void {
    this.createFormData = this.fb.group({
      tenDangNhapSV: ['', Validators.required],
      maLopHocPhan: [this.data.maLopHocPhan, Validators.required],
      maHocKy: [this.data.maHocKy, Validators.required],
    });

    this.httpClient.getLopHocPhans().subscribe({
      next: (data) => {
        this.lopHocPhans = data;
      },
    });

    this.httpClient.getHocKies().subscribe({
      next: (data) => {
        this.hocKys = data;
      },
    });
  }

  onSubmit() {
    const dataForm = this.createFormData.value;

    console.log('dataHPcreate', dataForm);

    const tenDangNhapSV = dataForm.tenDangNhapSV;
    let itemX = this.lopHocPhans.find(
      (x) =>
        x.maLopHocPhan === dataForm.maLopHocPhan &&
        x.ketQuaHocTaps?.some((kq) => kq.tenDangNhapSV === tenDangNhapSV)
    );
    console.log('tenDangNhapSV', itemX);

    if (itemX) {
      this.showNotification(
        'Sinh viên đã tồn tại trong lớp học phần này!',
        'warn'
      );
      return;
    }

    if (this.createFormData.valid) {
      this.httpClient.postKetQuaHocTap(dataForm).subscribe({
        next: () => {
          this.showNotification(
            'Đã thêm sinh viên vào lớp học phần thành công!',
            'success'
          );
          this.createFormData.reset();
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Lỗi khi thêm sinh viên vào lớp học phần:', error);
          this.showNotification(
            'Thêm sinh viên vào lớp học phần thất bại!',
            'error'
          );
        },
      });
    } else {
      this.showNotification('Vui lòng điền đầy đủ thông tin!', 'warn');
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
