import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';
import { forkJoin } from 'rxjs';
import { SinhVien } from '../../../../model/sinh-vien.model';
import { HocPhan } from '../../../../model/hoc-phan.model';
import { HocKy } from '../../../../model/hoc-ky.model';
import { KetQuaHocTap } from '../../../../model/ket-qua-hoc-tap.model';
import { HttpClientApiService } from '../../../../core/services/http-client-api.service';

registerLocaleData(localeVi);

interface MonHoc {
  tenHP: string;
  soTinChi: number;
  diemQT: number;
  diemThi: number;
  diemTongKet: number;
  GPA: number;
  KetQua: string;
  maLopHocPhan: string;
}

interface KyHoc {
  kiHoc: number;
  monHoc: MonHoc[];
  tongDiemHe10: number;
  GPAHe4: number;
  tongTinChi: number;
  xepLoai: string;
}

interface BangDiemNamHoc {
  namHoc: number;
  kyHoc: KyHoc[];
}

@Component({
  selector: 'app-view-sinh-vien',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-sinh-vien.component.html',
  styleUrl: './view-sinh-vien.component.scss',
  providers: [{ provide: LOCALE_ID, useValue: 'vi' }],
})
export class ViewSinhVienComponent implements OnInit {
  sinhVien?: SinhVien;
  bangDiemTheoNam: BangDiemNamHoc[] = [];
  loading = true;
  error?: string;

  private hocPhanMap: Map<string, HocPhan> = new Map();
  private lopHocPhanMap: Map<string, { hocKySo: number; namHoc: number }> =
    new Map();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClientApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/admin/students']);
      return;
    }

    forkJoin({
      sinhVien: this.httpClient.getSinhVienById(id),
      hocPhans: this.httpClient.getHocPhans(),
      hocKies: this.httpClient.getHocKies(),
    }).subscribe({
      next: ({ sinhVien, hocPhans, hocKies }) => {},
      error: (error) => {
        console.error('Lỗi khi tải dữ liệu:', error);
        this.error = 'Không thể tải thông tin sinh viên';
        this.loading = false;
      },
    });
  }

  goBack() {
    window.history.back();
  }
}
