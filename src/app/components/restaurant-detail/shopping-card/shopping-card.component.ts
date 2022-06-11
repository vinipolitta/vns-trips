import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { rubberBandAnimation } from "angular-animations";
import { ShoppingCardService } from "src/app/core/services/shopping-card.service";


@Component({
  selector: "app-shopping-card",
  templateUrl: "./shopping-card.component.html",
  styleUrls: ["./shopping-card.component.scss"],
  animations: [
    trigger("row", [
      state("ready", style({ opacity: 1 })),
      transition(
        "void => ready",
        animate(
          "1000ms 0s ease-in",
          keyframes([
            style({ opacity: 0, transform: "translateX(-30px)", offset: 0 }),
            style({ opacity: 0.8, transform: "translateX(10px)", offset: 0.8 }),
            style({ opacity: 1, transform: "translateX(0px)", offset: 1 }),
          ])
        )
      ),
      transition(
        "ready => void",
        animate(
          "1000ms 0s ease-out",
          keyframes([
            style({ opacity: 1, transform: "translateX(0px)", offset: 1 }),
            style({ opacity: 0.8, transform: "translateX(-10px)", offset: 0.2 }),
            style({ opacity: 0, transform: "translateX(30px)", offset: 0 }),
          ])
        )
      ),
    ]),
    rubberBandAnimation()
  ],
})
export class ShoppingCardComponent implements OnInit {
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
