import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { CardItem } from "../../shared/interfaces/card-item";
import { ShoppingCardService } from "./shopping-card.service";
import { Injectable } from "@angular/core";
import { Order } from "src/app/shared/interfaces/order.model";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class OrderService {
  API = environment.apiURL;

  constructor(
    private cartService: ShoppingCardService,
    private http: HttpClient
  ) {}

  cartItems(): CardItem[] {
    return this.cartService.items;
  }

  increaseQty(item: CardItem) {
    this.cartService.increaseQty(item);
  }

  decreaseQty(item: CardItem) {
    this.cartService.decreaseQty(item);
  }

  remove(item: CardItem) {
    this.cartService.removeItem(item);
  }

  itemValue(): number {
    return this.cartService.total();
  }

  checkOrder(order: Order): Observable<Order> {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http.post<Order>(this.API + "/orders", order);
  }

  clear() {
    this.cartService.clear();
  }
}
