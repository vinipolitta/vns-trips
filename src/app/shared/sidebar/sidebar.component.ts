import { AccountService } from './../../core/services/account.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../interfaces/user';
import { take } from 'rxjs';

declare interface RouteInfo {
  path: string;
  title: string;
  typeIcon: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  // {
  //   path: "/dashboard",
  //   title: "Dashboard",
  //   icon: "icon-chart-pie-36",
  //   class: "",
  // },
  {
    path: '/dashboard',
    title: 'Dashboard',
    typeIcon: '',
    icon: 'fa-chart-line',
    class: '',
  },
  {
    path: '/home',
    title: 'Home',
    typeIcon: '-solid',
    icon: 'fa-house-user',
    class: '',
  },
  {
    path: '/eventos',
    title: 'Eventos',
    typeIcon: '',
    icon: 'fa-calendar-alt',
    class: '',
  },
  {
    path: 'user/perfil',
    title: 'Perfil',
    typeIcon: '',
    icon: 'fa-user-alt',
    class: '',
  },
  {
    path: '/contatos',
    title: 'Contatos',
    typeIcon: '-regular',
    icon: 'fa-calendar',
    class: '',
  },
];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() isCollapsed!: boolean;
  menuItems!: any[];
  currentUser: any;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.currentUsers();
  }

  public currentUsers(): void {
    this.accountService.curentUser$
      .pipe(take(1))
      .subscribe((currentUser) => (this.currentUser = currentUser.userName));
  }

  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
