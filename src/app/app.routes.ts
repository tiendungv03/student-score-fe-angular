import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '404', component: NotFoundComponent },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/admin/admin-layout/admin-layout.component').then(
        (m) => m.AdminLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'account', pathMatch: 'full' },
      {
        path: 'account',
        loadComponent: () =>
          import('./pages/admin/accounts/accounts.component').then(
            (m) => m.AccountsComponent
          ),
      },
      {
        path: 'roles',
        loadComponent: () =>
          import('./pages/admin/permissions/permissions.component').then(
            (m) => m.PermissionsComponent
          ),
      },
      {
        path: 'departments',
        loadComponent: () =>
          import('./pages/admin/departments/departments.component').then(
            (m) => m.DepartmentsComponent
          ),
      },
      {
        path: 'teachers',
        loadComponent: () =>
          import('./pages/admin/teachers/teachers.component').then(
            (m) => m.TeachersComponent
          ),
      },
      {
        path: 'teachers/:id',
        loadComponent: () =>
          import(
            './pages/admin/teachers/view-giao-vien/view-giao-vien.component'
          ).then((m) => m.ViewGiaoVienComponent),
      },
      {
        path: 'students',
        loadComponent: () =>
          import('./pages/admin/students/students.component').then(
            (m) => m.StudentsComponent
          ),
      },
      {
        path: 'students/:id',
        loadComponent: () =>
          import(
            './pages/admin/students/view-sinh-vien/view-sinh-vien.component'
          ).then((m) => m.ViewSinhVienComponent),
      },
      {
        path: 'courses',
        loadComponent: () =>
          import('./pages/admin/courses/courses.component').then(
            (m) => m.CoursesComponent
          ),
      },
      {
        path: 'course-classes',
        loadComponent: () =>
          import('./pages/admin/course-classes/course-classes.component').then(
            (m) => m.CourseClassesComponent
          ),
      },
      {
        path: 'course-classes/:maLopHocPhan/:maHocKy',
        loadComponent: () =>
          import(
            './pages/admin/course-classes/view-lop-hoc-phan/view-lop-hoc-phan.component'
          ).then((m) => m.ViewLopHocPhanComponent),
      },
      {
        path: 'tiet_hoc',
        loadComponent: () =>
          import('./pages/admin/tiet-hoc/tiet-hoc.component').then(
            (m) => m.TietHocComponent
          ),
      },
      {
        path: 'hoc_ki',
        loadComponent: () =>
          import('./pages/admin/hoc-ky/hoc-ky.component').then(
            (m) => m.HocKyComponent
          ),
      },
    ],
  },

  {
    path: 'teacher',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/teachers/teachers-layout/teachers-layout.component').then(
        (m) => m.TeachersLayoutComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'course-classes',
        pathMatch: 'full',
      },
      {
        path: 'course-classes',
        loadComponent: () =>
          import(
            './pages/teachers/course-classes/course-classes.component'
          ).then((m) => m.CourseClassesComponent),
      },

      {
        path: 'course-classes/:maLopHocPhan',
        loadComponent: () =>
          import('./pages/teachers/display-sv/display-sv.component').then(
            (m) => m.DisplaySVComponent
          ),
      },

      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/teachers/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
      },

      {
        path: 'schedule',
        loadComponent: () =>
          import('./pages/teachers/schedule/schedule.component').then(
            (m) => m.ScheduleComponent
          ),
      },
    ],
  },

  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/student/student-layout/student-layout.component').then(
        (m) => m.StudentLayoutComponent
      ),
    children: [
      {
        path: 'ThongTinSinhVien',
        loadComponent: () =>
          import('./pages/student/view-student/view-student.component').then(
            (m) => m.ViewStudentComponent
          ),
      },
      {
        path: 'Thoi-khoa-bieu',
        loadComponent: () =>
          import('./pages/student/timetable/timetable.component').then(
            (m) => m.TimetableComponent
          ),
      },
      {
        path: 'Dang_ky_hoc_phan',
        loadComponent: () =>
          import(
            './pages/student/dang-ky-lop-hoc-phan/dang-ky-lop-hoc-phan.component'
          ).then((m) => m.DangKyLopHocPhanComponent),
      },
      {
        path: 'Ket_qua_hoc_tap',
        loadComponent: () =>
          import(
            './pages/student/ket-qua-hoc-tap/ket-qua-hoc-tap.component'
          ).then((m) => m.KetQuaHocTapComponent),
      },
      { path: '', redirectTo: 'ThongTinSinhVien', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '/404' }, // fallback route
];
