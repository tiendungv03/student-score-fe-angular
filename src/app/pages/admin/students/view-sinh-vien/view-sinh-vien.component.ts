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
      next: ({ sinhVien, hocPhans, hocKies }) => {
        this.sinhVien = sinhVien;
        this.hocPhanMap = new Map<string, HocPhan>(
          hocPhans.map((hp: HocPhan) => [hp.maHP, hp])
        );
        this.lopHocPhanMap = new Map(
          hocKies.flatMap(
            (hk: any) =>
              hk.lopHocPhans?.map((lhp: any) => [
                lhp.maLopHocPhan,
                { hocKySo: hk.hocKySo, namHoc: hk.namHoc },
              ]) || []
          )
        );
        this.bangDiemTheoNam = this.xuLyBangDiem(sinhVien.ketQuaHocTaps || []);
        this.loading = false;
      },
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

  xuLyBangDiem(ketQuaHocTaps: KetQuaHocTap[]): BangDiemNamHoc[] {
    const grouped: { [nam: string]: { [ki: string]: KyHoc } } = {};

    for (const kq of ketQuaHocTaps) {
      const lopInfo = this.lopHocPhanMap.get(kq.maLopHocPhan) || {
        hocKySo: 0,
        namHoc: 0,
      };
      const namHoc = lopInfo.namHoc || new Date().getFullYear();
      const kiHoc = lopInfo.hocKySo || 1;
      const hocPhan = Array.from(this.hocPhanMap.values()).find((hp) =>
        hp.lopHocPhans?.some((lhp) => lhp.maLopHocPhan === kq.maLopHocPhan)
      );
      const maHP = hocPhan?.maHP || '';
      const tenHP = hocPhan?.tenHP || kq.maLopHocPhan;
      const soTinChi = hocPhan?.soTinChi || 0;
      const diemTongKet = kq.diemTongKet || 0;
      const GPA = this.tinhGPA(diemTongKet);
      const KetQua = kq.xepLoai || (diemTongKet >= 5 ? 'Đạt' : 'Rớt');

      const monHoc: MonHoc = {
        tenHP,
        soTinChi,
        diemQT: kq.diemQT || 0,
        diemThi: kq.diemThi || 0,
        diemTongKet,
        GPA,
        KetQua,
        maLopHocPhan: kq.maLopHocPhan,
      };

      if (!grouped[namHoc]) grouped[namHoc] = {};
      if (!grouped[namHoc][kiHoc]) {
        grouped[namHoc][kiHoc] = {
          kiHoc,
          monHoc: [],
          tongDiemHe10: 0,
          GPAHe4: 0,
          tongTinChi: 0,
          xepLoai: '',
        };
      }
      grouped[namHoc][kiHoc].monHoc.push(monHoc);
      grouped[namHoc][kiHoc].tongDiemHe10 += diemTongKet * soTinChi;
      grouped[namHoc][kiHoc].GPAHe4 += GPA * soTinChi;
      grouped[namHoc][kiHoc].tongTinChi += soTinChi;
    }

    const bangDiemTheoNam: BangDiemNamHoc[] = Object.entries(grouped).map(
      ([namHoc, kyHocsObj]) => {
        const kyHocArr: KyHoc[] = Object.values(kyHocsObj).map((kyHoc) => {
          const tongTinChi = kyHoc.tongTinChi || 1;
          const GPAHe4 = kyHoc.GPAHe4 / tongTinChi;
          const tongDiemHe10 = kyHoc.tongDiemHe10 / tongTinChi;
          const xepLoai = this.xepLoaiHocLuc(GPAHe4);
          return {
            ...kyHoc,
            GPAHe4,
            tongDiemHe10,
            xepLoai,
          };
        });
        return {
          namHoc: Number(namHoc),
          kyHoc: kyHocArr,
        };
      }
    );

    return bangDiemTheoNam;
  }

  tinhGPA(diem: number): number {
    if (diem < 0 || diem > 10) return 0;
    if (diem >= 8.5) return 4.0;
    if (diem >= 7.0) return 3.0;
    if (diem >= 5.5) return 2.0;
    if (diem >= 4.0) return 1.0;
    return 0.0;
  }

  xepLoaiHocLuc(gpa: number): string {
    if (gpa >= 3.6) return 'Xuất sắc';
    if (gpa >= 3.2) return 'Giỏi';
    if (gpa >= 2.5) return 'Khá';
    if (gpa >= 2.0) return 'Trung bình';
    return 'Yếu';
  }
}
