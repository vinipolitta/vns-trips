import { Component, OnInit, Output } from '@angular/core';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
import { Restaurant } from 'src/app/shared/interfaces/restaurant';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {
  @Output() coluns = [
    "name",
    "rating",
    "deliveryEstimate",
    "category",
  ];
  @Output() dataTables: Restaurant[];

  constructor(private restaurantService: RestaurantService,) { }

  ngOnInit(): void {
    this.getRestaurat();

  }

  getRestaurat() {
    this.restaurantService.getRestaurant().subscribe(
      (res: Restaurant[]) => {this.dataTables = res
      },
      (error: any) => {
        console.error(error);
      }
    );
  }


}
