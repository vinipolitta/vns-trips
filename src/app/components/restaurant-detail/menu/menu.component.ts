import { MenuItem } from './../../../shared/interfaces/menu-item';
import { Observable } from 'rxjs';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RestaurantService } from "src/app/core/services/restaurant.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  menuItems : Observable<MenuItem[]>
  routeId: any;
  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeId = this.route.parent.snapshot.params['id'];
    this.menuOfRestaurant();
  }

  menuOfRestaurant() {
    this.menuItems = this.restaurantService.menuOfRestaurant(this.routeId);
  }

  addMenuItem(item: MenuItem) {
    console.log(item)
  }
}
