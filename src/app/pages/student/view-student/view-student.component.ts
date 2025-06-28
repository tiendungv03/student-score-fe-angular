import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientApiService } from '../../../core/services/http-client-api.service';
import { CommonModule } from '@angular/common';
import { SinhVien } from '../../../model/sinh-vien.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-student',
  imports: [CommonModule],
  templateUrl: './view-student.component.html',
  styleUrl: './view-student.component.scss',
})
export class ViewStudentComponent {
  private dataApi!: SinhVien;
  public sinhVien!: SinhVien;
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
    const tenDangNhap: string = this.userName ?? '';
    if (this.userName) {
      this.httpClient.getSinhVienById(tenDangNhap).subscribe({
        next: (data) => {
          this.dataApi = data;
          this.sinhVien = this.dataApi;
          console.log('datasv', this.sinhVien);
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
