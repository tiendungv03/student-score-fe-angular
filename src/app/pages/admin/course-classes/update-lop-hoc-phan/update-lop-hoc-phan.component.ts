import { Component, InjectionToken, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientApiService } from '../../../../core/services/http-client-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Khoa } from '../../../../model/khoa.model';
import { GiangVien } from '../../../../model/giang-vien.model';
import { HocPhan } from '../../../../model/hoc-phan.model';
import { LopHocPhan } from '../../../../model/lop-hoc-phan.model';
import { HocKy } from '../../../../model/hoc-ky.model';

@Component({
  selector: 'app-update-lop-hoc-phan',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-lop-hoc-phan.component.html',
  styleUrl: './update-lop-hoc-phan.component.scss',
})
export class UpdateLopHocPhanComponent implements OnInit {
  updateFormData!: FormGroup;
  public khoas: Khoa[] = [];
  public hocPhans: HocPhan[] = [];
  public giangViens: GiangVien[] = [];
  private lopHocPhans: LopHocPhan[] = [];
  public hocKys: HocKy[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClientApiService,
    private dialogRef: MatDialogRef<UpdateLopHocPhanComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { lopHocPhan?: any }
  ) {}

  ngOnInit(): void {
    const lopHocPhan = this.data?.lopHocPhan;

    this.updateFormData = this.fb.group({
      maLopHocPhan: [lopHocPhan.maLopHocPhan || '', Validators.required],
      tietHocId: [lopHocPhan.tietHocId || '', Validators.required],
      phong: [lopHocPhan.phong || '', Validators.required],
      // tenDangNhapGVMoi: ['', Validators.required],
      tenDangNhapGV: ['', Validators.required],
      siSoToiDa: [lopHocPhan.phong || '', Validators.required],
    });

    this.loading = true;
    // this.httpClient.getTeachers().subscribe({
    //   next: (data) => {
    //     this.giangViens = data.items;
    //   },
    // });

    // this.httpClient.getLopHocPhans().subscribe({
    //   next: (data) => {
    //     this.lopHocPhans = data.items;
    //   },
    // });

    // this.httpClient.getHocPhans().subscribe({
    //   next: (data) => {
    //     this.hocPhans = data.items;
    //   },
    // });

    // this.httpClient.getHocKies().subscribe({
    //   next: (data) => {
    //     this.hocKys = data.items;
    //   },
    // });
  }

  onSubmit() {
    // if (this.updateFormData.invalid) {
    //   return;
    // }

    const updatedData = {
      tietHocId: this.updateFormData.get('tietHocId')?.value,
      phong: this.updateFormData.get('phong')?.value,
      tenDangNhapGVMoi: this.updateFormData.get('tenDangNhapGVMoi')?.value,
      siSoToiDa: this.updateFormData.get('siSoToiDa')?.value,
    };
    const maLopHocPhan = this.data?.lopHocPhan?.maLopHocPhan;
    const maHocKi = this.data?.lopHocPhan?.maHocKy;

    if (updatedData) {
      if (!maLopHocPhan) {
        this.showNotification(
          'Không tìm thấy mã lớp học phần để cập nhật!',
          'error'
        );
        return;
      }
      this.httpClient
        .patchLopHocPhans(maLopHocPhan, maHocKi, updatedData)
        .subscribe({
          next: () => {
            this.showNotification('Đã cập nhật học phần!', 'success');
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error('Lỗi khi cập nhật lớp học phần:', error);
            this.showNotification('Lỗi khi cập nhật lớp học phần!', 'error');
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
