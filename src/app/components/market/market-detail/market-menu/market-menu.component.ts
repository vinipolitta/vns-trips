import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
import { ShoppingCardService } from 'src/app/core/services/shopping-card.service';
import { MenuItem } from 'src/app/shared/interfaces/menu-item';

@Component({
  selector: 'app-market-menu',
  templateUrl: './market-menu.component.html',
  styleUrls: ['./market-menu.component.scss'],

})
export class MarketMenuComponent implements OnInit {

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
