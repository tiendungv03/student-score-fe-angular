import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientApiService } from '../../../core/services/http-client-api.service';
import { SinhVien } from '../../../model/sinh-vien.model';


@Component({
  selector: 'app-display-sv',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './display-sv.component.html',
  styleUrl: './display-sv.component.scss'
})
export class DisplaySVComponent implements OnInit  {
  maLopHocPhan: string = '';
  danhSachSinhVien: any[] = [];
  dataApi: SinhVien [] = [];
 
   constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClientApiService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
  }

ngOnInit() {
    this.maLopHocPhan = this.route.snapshot.paramMap.get('maLopHocPhan') || '';
    if (this.maLopHocPhan) {
      this.loadStudents();
    }
    else {
    this.danhSachSinhVien = [];   // <- Dòng này là quan trọng
  }
  }
     
    
    loadStudents() {
    this.httpClient.getSinhVienLop(this.maLopHocPhan).subscribe({
      next: (data) => {
        this.danhSachSinhVien = data;
        console.log('Sinh viên đã đăng ký:', this.danhSachSinhVien);
      },
      error: (err) => {
        console.error('Lỗi khi tải danh sách sinh viên:', err);
      }
    });
  }


}

