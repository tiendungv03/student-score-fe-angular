import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClientApiService } from '../../../core/services/http-client-api.service';
@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  giangVienInfomation: any = {}; 
  constructor(private HttpCLient: HttpClientApiService) {}

  ngOnInit() {
   this.loadGVProfile();
  }

  loadGVProfile() {
    this.HttpCLient.getThongTinGiangVien().subscribe({
      next: (data) => {
        this.giangVienInfomation = data;
        console.log('Thông tin giảng viên:', this.giangVienInfomation);
      },
      error: (err) => {
        console.error('Lỗi khi tải thông tin giảng viên:', err);
      }
    });
  }

    

  
}

