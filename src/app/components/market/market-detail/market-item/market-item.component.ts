import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'src/app/shared/interfaces/menu-item';

@Component({
  selector: 'app-market-item',
  templateUrl: './market-item.component.html',
  styleUrls: ['./market-item.component.scss']
})
export class MarketItemComponent implements OnInit {

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
