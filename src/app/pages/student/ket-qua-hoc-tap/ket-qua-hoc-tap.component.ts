import { Component, OnInit } from '@angular/core';
import { HttpClientApiService } from '../../../core/services/http-client-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KetQuaHocTap } from '../../../model/ket-qua-hoc-tap.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ket-qua-hoc-tap',
  imports: [CommonModule],
  templateUrl: './ket-qua-hoc-tap.component.html',
  styleUrl: './ket-qua-hoc-tap.component.scss',
})
export class KetQuaHocTapComponent implements OnInit {
  ketQuaList: any[] = [];

  constructor(
    private httpClient: HttpClientApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadKetQua();
  }

  loadKetQua() {
    this.httpClient.getKet_qua_hoc_tap().subscribe({
      next: (data) => {
        this.ketQuaList = data;

        console.log('data kq', this.ketQuaList);
      },
      error: () => {
        this.snackBar.open('Không thể tải kết quả học tập', 'Đóng', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
      },
    });
  }
}
