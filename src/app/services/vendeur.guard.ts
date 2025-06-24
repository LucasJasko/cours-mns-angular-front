import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { NotificationService } from './notification.service';

export const vendeurGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const Notification = inject(NotificationService);

  if (
    authService.user?.role == 'vendeur' ||
    authService.user?.role == 'administrateur'
  ) {
    return true;
  }

  Notification.show(
    "Vous n'avez pas accès à cette page, connectez vous en tant que vendeur",
    'error'
  );
  return router.parseUrl('/connection');
};
