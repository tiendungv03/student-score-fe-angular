import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientApiService } from '../../../core/services/http-client-api.service';
import { CommonModule } from '@angular/common';
import { SinhVien } from '../../../model/sinh-vien.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-student',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss'],
})
export class ViewStudentComponent implements OnInit {
  public sinhVien: any;
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
      this.httpClient.getSinh_Vien_Thong_Tin().subscribe({
        next: (data) => {
          this.sinhVien = data;
          console.log('Thông tin sinh viên:', this.sinhVien);
        },
        error: () => {
          this.showNotification('Không thể tải dữ liệu sinh viên', 'error');
        },
      });
    } else {
      this.showNotification('Đã hết thời gian hiệu lực', 'error');
      this.router.navigate(['/login']);
    }
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
