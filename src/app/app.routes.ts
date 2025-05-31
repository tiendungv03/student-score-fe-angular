import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { AccountsComponent } from './pages/admin/accounts/accounts.component';
import { AdminLayoutComponent } from './pages/admin/admin-layout/admin-layout.component';
import { CoursesComponent } from './pages/admin/courses/courses.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
//Student
import { StudentLayoutComponent } from './pages/student/student-layout/student-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '404', component: NotFoundComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard], // ← bảo vệ route này
  },
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
        path: 'courses',
        loadComponent: () =>
          import('./pages/admin/courses/courses.component').then(
            (m) => m.CoursesComponent
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
    children: [],
  },
  {
    path: 'student',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/student/student-layout/student-layout.component').then(
        (m) => m.StudentLayoutComponent
      ),
    children: [],
  },
  { path: '**', redirectTo: '/404' }, // fallback route
];
