import { MenuItem } from "./../../../shared/interfaces/menu-item";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { rubberBandAnimation } from "angular-animations";

@Component({
  selector: "app-menu-item",
  templateUrl: "./menu-item.component.html",
  styleUrls: ["./menu-item.component.scss"],
  animations: [
    trigger("menuItemAppeared", [
      state("ready", style({ opacity: 1 })),
      transition("void => ready", [
        style({ opacity: 0, trasform: "translateY( -20px)" }),
        animate("300ms 0s ease-in"),
      ]),
    ]),
    rubberBandAnimation()

  ],
})
export class MenuItemComponent implements OnInit {
  // coluns = ['name', 'description', 'price', 'add'];
  @Input() menuItem: MenuItem;
  @Output() add = new EventEmitter();
  menuItemState = "ready";
  rubber = false;
  constructor() {}

  ngOnInit(): void {}

  emitAddEvent() {
    this.add.emit(this.menuItem);
  }
}
