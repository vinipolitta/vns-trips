import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
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
    path: "/home",
    title: "Home",
    icon: "icon-bank",
    class: "",
  },
  {
    path: "/market",
    title: "Market",
    icon: "icon-cart",
    class: "",
  },
  // {
  //   path: "/restaurant",
  //   title: "Restaurant",
  //   icon: "icon-cart",
  //   class: "",
  // },



];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})


export class SidebarComponent implements OnInit {
  @Input() isCollapsed!: boolean;
  menuItems!: any[];



  constructor() { }

  ngOnInit(): void {
    console.log('cheguei', this.isCollapsed);
    this.menuItems = ROUTES.filter((menuItem) => menuItem);

  }

  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }


}
