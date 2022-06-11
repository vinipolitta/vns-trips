import { MenuItem } from "./menu-item";
export class CardItem {
  constructor(public menuItem: MenuItem, public quantity: number = 1) {}

  value(): number {
    return this.menuItem.price * this.quantity;
  }
}
