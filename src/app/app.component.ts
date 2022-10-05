import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vnsCreative';

constructor(private router: Router) {

}
  public showMenu(): boolean {
    return this.router.url !== '/user/login' && this.router.url !== '/user/registration';
  }
}
