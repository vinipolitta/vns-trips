import { Component, OnInit } from '@angular/core';
import { ShoppingCardService } from 'src/app/core/services/shopping-card.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private shoppingCardService: ShoppingCardService) {}
  rowState = "ready";
  rubber = false;

  ngOnInit(): void {}

  items(): any[] {
    return this.shoppingCardService.items;
  }

  total(): number {
    return this.shoppingCardService.total();
  }

  clear() {
    this.shoppingCardService.clear();
  }

  removeItem(item) {
    console.log(item);

    this.shoppingCardService.removeItem(item);
  }

  addItem(item) {
    this.shoppingCardService.addItem(item);
  }
}
