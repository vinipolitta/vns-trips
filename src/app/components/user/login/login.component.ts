import { UserLogin } from './../../../shared/interfaces/user-login';
import { AccountService } from './../../../core/services/account.service';
import { Component, OnInit } from '@angular/core';
import { NotificationsAlertsService } from '@app/core/services/notifications-alerts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  widthImg = 180;
  margenImg = 100;

  model = {} as UserLogin;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private notificationsAlertsService: NotificationsAlertsService
  ) {}

  ngOnInit(): void {}

  public login(): void {
    this.accountService.login(this.model).subscribe(
      () => {
        this.router.navigateByUrl('/home');
      },
      (error) => {
        if (error.status == 401)
          this.notificationsAlertsService.showNotification(
            'danger',
            'bottom',
            'right',
            'Usuario ou senha invalido',
            'Error!!'
          );
        else console.error(error);
      }
    );
  }
}
