import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('userRole'); // phải lưu từ login
  const userName = localStorage.getItem('userName');

  if (token) {
    const allowedRoles = route.data?.['roles'];
    if (!allowedRoles || allowedRoles.includes(userRole)) {
      return true;
    }
    // Không đủ quyền
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  } else {
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }
};
