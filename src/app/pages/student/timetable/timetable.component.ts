import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThoiKhoaBieu } from '../../../model/thoi-khoa-bieu';
import { HttpClientApiService } from '../../../core/services/http-client-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timetable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
})
export class TimetableComponent implements OnInit {
  public thoiKhoaBieu: ThoiKhoaBieu[] = [];
  public tietList = Array.from({ length: 10 }, (_, i) => i + 1); // Tiết 1 đến 10
  public thuList: number[] = [1, 2, 3, 4, 5, 6, 0]; // Thứ 2 đến Chủ nhật
  userName: string | null = localStorage.getItem('userName');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClientApiService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadDataApi();
  }

  loadDataApi() {
    if (this.userName) {
      this.httpClient.getThoi_khoa_bieu().subscribe({
        next: (data) => {
          this.thoiKhoaBieu = data;
        },
        error: () => {
          this.showNotification(
            'Không thể tải dữ liệu thời khoa biểu',
            'error'
          );
        },
      });
    } else {
      this.showNotification('Đã hết thời gian hiệu lực', 'error');
      this.router.navigate(['/login']);
    }
  }

  getMonHoc(tiet: number, thu: number): ThoiKhoaBieu | null {
    return (
      this.thoiKhoaBieu.find(
        (item) =>
          item.thu === thu && tiet >= item.tietDau && tiet <= item.tietCuoi
      ) || null
    );
  }

  getThuLabel(thu: number): string {
    const labels = [
      'Chủ nhật',
      'Thứ 2',
      'Thứ 3',
      'Thứ 4',
      'Thứ 5',
      'Thứ 6',
      'Thứ 7',
    ];
    return labels[thu];
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
