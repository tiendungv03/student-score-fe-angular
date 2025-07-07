import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-teachers-layout',
  imports: [RouterLink, RouterModule, RouterOutlet, CommonModule],
  templateUrl: './teachers-layout.component.html',
  styleUrl: './teachers-layout.component.scss',
})
export class TeachersLayoutComponent {
  userRole: string | null = localStorage.getItem('userRole');
  userName: string | null = localStorage.getItem('userName');

  isSidebarClosed = false;

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    window.location.href = '/login';
  }
}
