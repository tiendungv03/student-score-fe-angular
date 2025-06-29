// import { Component, Inject, OnInit } from '@angular/core';
// import {
//   FormBuilder,
//   FormGroup,
//   Validators,
//   ValidationErrors,
// } from '@angular/forms';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpClientApiService } from '../../../../core/services/http-client-api.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-create-sinh-vien',
//   imports: [FormsModule, ReactiveFormsModule, CommonModule],
//   templateUrl: './create-sinh-vien.component.html',
//   styleUrl: './create-sinh-vien.component.scss',
// })
// export class CreateSinhVienComponent {
//   createFormData!: FormGroup;
//   public khoas: any[] = [];
//   public lops: any[] = [];

//   constructor(
//     private fb: FormBuilder,
//     private httpClient: HttpClientApiService,
//     private dialogRef: MatDialogRef<CreateSinhVienComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: { khoa?: any; mode?: string }
//   ) {}

//   ngOnInit(): void {
//     this.createFormData = this.fb.group({
//       tenDangNhap: ['', Validators.required],
//       hoTen: ['', Validators.required],
//       ngaySinh: ['', Validators.required],
//       gioiTinh: [true, Validators.required],
//       lop: ['', Validators.required],
//       maKhoa: ['', Validators.required],
//     });

//     this.httpClient.getDepartments().subscribe({
//       next: (data) => {
//         this.khoas = data;
//       },
//     });

//     this.httpClient.getLopHocPhans().subscribe({
//       next: (data) => {
//         this.lops = data;
//         console.log('acc: ' + JSON.stringify(this.lops, null, 2));
//       },
//     });
//   }

//   onSubmit() {
//     const dataForm = this.createFormData.value;

//     if (this.createFormData.valid) {
//       this.httpClient.postStudent(dataForm).subscribe({
//         next: () => {
//           this.createFormData.reset();
//           this.dialogRef.close(true);
//         },
//         error: (error) => {
//           console.error('Lỗi khi tạo khoa:', error);
//         },
//       });
//     }
//   }

//   onCancel() {
//     this.dialogRef.close();
//   }
// }

import { Component, Inject, OnInit, LOCALE_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientApiService } from '../../../../core/services/http-client-api.service';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localeVi from '@angular/common/locales/vi';
import { forkJoin } from 'rxjs';
import { Khoa } from '../../../../model/khoa.model';
import { LopHocPhan } from '../../../../model/lop-hoc-phan.model';
import { SinhVien } from '../../../../model/sinh-vien.model';

registerLocaleData(localeVi);

@Component({
  selector: 'app-create-sinh-vien',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-sinh-vien.component.html',
  styleUrl: './create-sinh-vien.component.scss',
  providers: [{ provide: LOCALE_ID, useValue: 'vi' }],
})
export class CreateSinhVienComponent implements OnInit {
  createFormData!: FormGroup;
  khoas: Khoa[] = [];
  lopHocPhans: LopHocPhan[] = [];
  filteredLopHocPhans: LopHocPhan[] = [];
  loading = true;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClientApiService,
    private dialogRef: MatDialogRef<CreateSinhVienComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { khoa?: Khoa; mode?: string }
  ) {}

  ngOnInit(): void {
    this.createFormData = this.fb.group({
      tenDangNhap: ['', [Validators.required, Validators.minLength(3)]],
      hoTen: ['', [Validators.required, Validators.minLength(2)]],
      ngaySinh: ['', Validators.required],
      gioiTinh: [true, Validators.required],
      lop: ['', Validators.required],
      maKhoa: ['', Validators.required],
    });

    forkJoin({
      khoas: this.httpClient.getDepartments(),
      lopHocPhans: this.httpClient.getLopHocPhans(),
    }).subscribe({
      next: ({ khoas, lopHocPhans }) => {
        this.khoas = khoas.items;
        this.lopHocPhans = lopHocPhans.items;
        this.filterLopHocPhans();
        this.loading = false;
      },
      error: (error) => {
        console.error('Lỗi khi tải dữ liệu:', error);
        this.loading = false;
      },
    });

    this.createFormData.get('maKhoa')?.valueChanges.subscribe(() => {
      this.filterLopHocPhans();
      this.createFormData.get('lop')?.setValue('');
    });
  }

  filterLopHocPhans() {
    const selectedMaKhoa = this.createFormData.get('maKhoa')?.value;
    this.filteredLopHocPhans = selectedMaKhoa
      ? this.lopHocPhans.filter((lop) => lop.hocPhan?.maKhoa === selectedMaKhoa)
      : this.lopHocPhans;
  }

  onSubmit() {
    if (this.createFormData.invalid) {
      this.createFormData.markAllAsTouched();
      return;
    }

    const dataForm = this.createFormData.getRawValue();
    this.httpClient.postStudent(dataForm).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Lỗi khi tạo sinh viên:', error);
      },
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
