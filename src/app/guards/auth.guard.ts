import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};

export const roleGuard: (allowedRoles: string[]) => CanActivateFn = (allowedRoles) => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isAuthenticated()) {
      router.navigate(['/login']);
      return false;
    }

    const user = authService.getCurrentUser();
    if (!user) {
      console.warn('User data not loaded yet');
      router.navigate(['/login']);
      return false;
    }

    const userRole = user.role || user.user?.role;
    if (!userRole || !allowedRoles.includes(userRole)) {
      console.warn(`User role ${userRole} not in allowed roles:`, allowedRoles);
      router.navigate(['/login']);
      return false;
    }

    return true;
  };
};


