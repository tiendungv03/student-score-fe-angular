import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientApiService } from '../../../core/services/http-client-api.service';

@Component({
  selector: 'app-schedule',
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent implements OnInit{
  thoiKhoaBieu: any[] = [];
  constructor(private httpClient: HttpClientApiService) {}

  ngOnInit(){
    console.log('ScheduleComponent đã khởi tạo!');
    this.loadSChedule();
  }
  loadSChedule(){
    this.httpClient.getThoiKhoaBieu().subscribe({
      next: (data) => {
        this.thoiKhoaBieu = data;
        console.log('Thời khóa biểu:', this.thoiKhoaBieu);
      },
      error: (err) => {
        console.error('Lỗi khi tải thời khóa biểu:', err);
      }
    });
  }
}
