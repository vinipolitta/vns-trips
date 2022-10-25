import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { AccountService } from './core/services/account.service';
import { User } from './shared/interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'vnsCreative';

  constructor(private router: Router, public accountService: AccountService) {}

  
  ngOnInit(): void {
    this.currentUser();
  }
  public currentUser(): void {
    let user: User;
    if (localStorage.getItem('currentUser'))
      user = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
    else user = null;

    if (user) {
      this.accountService.setCurrentUser(user);
    }
  }
  public showMenu(): boolean {
    return (
      this.router.url !== '/user/login' &&
      this.router.url !== '/user/registration'
    );
  }
}
