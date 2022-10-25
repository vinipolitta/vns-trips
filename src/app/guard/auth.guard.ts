import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { NotificationsAlertsService } from '@app/core/services/notifications-alerts.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private notificationAlert: NotificationsAlertsService
  ) {}
  canActivate(): boolean {
    if (localStorage.getItem('currentUser') !== null) return true;

    this.notificationAlert.showNotification(
      'error',
      'bottom',
      'right',
      `Usuario nao authenticado!!`,
      'Error!!'
    );
    this.router.navigate(['/user/login']);
    return false;
  }
}
