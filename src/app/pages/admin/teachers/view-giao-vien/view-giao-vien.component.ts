import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientApiService } from '../../../../core/services/http-client-api.service';
import { CommonModule } from '@angular/common';
import { GiangVien } from '../../../../model/giang-vien.model';
import { HocPhan } from '../../../../model/hoc-phan.model';
import { LopHocPhan } from '../../../../model/lop-hoc-phan.model';

@Component({
  selector: 'app-view-giao-vien',
  imports: [CommonModule],
  templateUrl: './view-giao-vien.component.html',
  styleUrl: './view-giao-vien.component.scss',
})
export class ViewGiaoVienComponent {
  giaoVien!: GiangVien;
  lopDangDay: LopHocPhan[] = [];
  lopKetThuc: LopHocPhan[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClientApiService
  ) {}

  ngOnInit(): void {
    const tenDangNhap = this.route.snapshot.paramMap.get('id');
    if (tenDangNhap) {
      this.httpClient.getByTeachers(tenDangNhap).subscribe((data) => {
        this.giaoVien = data;
        this.lopDangDay = data.lopHocPhans?.filter((l: any) => l.trangThai);
        this.lopKetThuc = data.lopHocPhans?.filter((l: any) => !l.trangThai);
      });
    }
  }

  goBack() {
    this.router.navigate(['/admin/teachers']);
  }

  xemDanhSachSinhVien(lop: any) {}
}
