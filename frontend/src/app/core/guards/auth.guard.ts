import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, User } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const user = auth.user();
  const roles = (route.data['roles'] || []) as User['role'][];

  if (!auth.isLoggedIn() || !user) {
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    return router.createUrlTree(['/']);
  }

  return true;
};
