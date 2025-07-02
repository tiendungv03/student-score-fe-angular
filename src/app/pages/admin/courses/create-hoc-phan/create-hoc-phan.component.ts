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

@Component({
  selector: 'app-create-hoc-phan',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-hoc-phan.component.html',
  styleUrl: './create-hoc-phan.component.scss',
})
export class CreateHocPhanComponent implements OnInit {
  createFormData!: FormGroup;
  public khoas: Khoa[] = [];
  private hocPhans: HocPhan[] = [];
  // private lops: any[] = [];

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClientApiService,
    private dialogRef: MatDialogRef<CreateHocPhanComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { hocPhan?: HocPhan; mode?: string }
  ) {}

  ngOnInit(): void {
    this.createFormData = this.fb.group({
      maHP: ['', Validators.required],
      tenHP: ['', Validators.required],
      soTinChi: ['', Validators.required],
      batBuoc: [true, Validators.required],
      maKhoa: ['', Validators.required],
    });

    this.httpClient.getDepartments().subscribe({
      next: (data) => {
        this.khoas = data.items;
      },
    });

    // this.httpClient.getLopHocPhans().subscribe({
    //   next: (data) => {
    //     this.lops = data;
    //   },
    // });

    this.httpClient.getHocPhans().subscribe({
      next: (data) => {
        this.hocPhans = data;
      },
    });
  }

  onSubmit() {
    const dataForm = this.createFormData.value;

    // const formValue = this.createFormData.value;;
    // const dataForm = {
    //   createDTO: {
    //     maHP: formValue.maHP,
    //     tenHP: formValue.tenHP,
    //     soTinChi: formValue.soTinChi,
    //     batBuoc: formValue.batBuoc === 'true' ? true : false,
    //     maKhoa: formValue.maKhoa,
    //     trangThai: true,
    //   },
    // };

    // console.log('dataHPcreate', dataForm);
    const maHocPhan = dataForm.maHP;

    let itemX = this.hocPhans.find((x) => x.maHP === maHocPhan);
    if (itemX) {
      this.showNotification('Mã học phần bị trùng!', 'warn');
      return;
    }

    if (this.createFormData.valid) {
      this.httpClient.postHocPhans(dataForm).subscribe({
        next: () => {
          this.showNotification('Tạo học phần thành công!', 'success');
          this.createFormData.reset();
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Lỗi khi tạo học phần:', error);
          this.showNotification('Tạo học phần thất bại!', 'error');
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
