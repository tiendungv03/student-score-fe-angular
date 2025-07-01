import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { HttpClientApiService } from '../../../core/services/http-client-api.service';
import { LopHocPhan } from '../../../model/lop-hoc-phan.model';


@Component({
  selector: 'app-course-classes',
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './course-classes.component.html',
  styleUrl: './course-classes.component.scss'
})
export class CourseClassesComponent implements OnInit{
  dataApi: LopHocPhan [] = [];
  filteredData: LopHocPhan [] = [];
  searchText = '';
  form!: FormGroup;
  isEditMode = false;

  constructor(
    private httpClient: HttpClientApiService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCourseClasses();
  
  }

  initForm() {
    this.form = this.fb.group({
      // id: [''],
      // username: ['', Validators.required],
      // password: ['', Validators.required],
      // role: ['', Validators.required],
    });
  }

  loadCourseClasses() {
    this.httpClient. getLopHocPhanByGiangVien().subscribe({
      next: (data) => {
        // console.log('Danh sách các lớp học phần:', data);
        this.dataApi = data;
        this.filteredData = [...this.dataApi];
      console.log('course: ', this.filteredData);
      },
      error: (err) => {
        console.error('Lỗi khi tải danh sách các lớp học phần :', err);
        this.showNotification('Không thể tải danh sách các lớp học phần', 'error');
      },
    });
  }

  filterCourseClasses() {
    const search = this.searchText.trim().toLowerCase();
    this.filteredData = this.dataApi.filter((courseClasses) => {
    const maLopHP = courseClasses?.maLopHocPhan?.toLowerCase() || '';
    const tenHocPhan = courseClasses.hocPhan?.tenHP?.toLowerCase() || '';
    const maHP = courseClasses.maHP?.toLowerCase() || '';
    const giangVien = courseClasses.giangVien?.hoTen?.toLowerCase() || '';
    const hocKy = courseClasses.hocKy?.toString() || '';
   
    
      return (
      maLopHP.includes(search) ||
      tenHocPhan.includes(search) ||
      maHP.includes(search) ||
      giangVien.includes(search) ||
      hocKy.includes(search) 
   
    
      );
    });
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

  xemListSV(maLopHocPhan: string) {
    // console.log('Xem danh sách sinh viên của lớp học phần:', maLopHocPhan);
  // this.router.navigate(['/teachers/course-classes/:maLopHocPhan', maLopHocPhan]);
  this.router.navigate(['/teacher/course-classes', maLopHocPhan]);

}
}
