import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardItem } from 'src/app/shared/interfaces/card-item';

@Component({
  selector: 'app-order-itens',
  templateUrl: './order-itens.component.html',
  styleUrls: ['./order-itens.component.scss']
})
export class OrderItensComponent implements OnInit {

  @Input() items: CardItem[];
  @Input() coluns: string[];

  @Output() increaseQty = new EventEmitter<CardItem>();
  @Output() decreaseQty = new EventEmitter<CardItem>();
  @Output() remove = new EventEmitter<CardItem>();

  constructor() {}

  ngOnInit(): void {
    console.log(this.items);

  }

  emitIncreaseQty(item: CardItem) {
    this.increaseQty.emit(item);
  }

  emitDecreaseQty(item: CardItem) {
    this.decreaseQty.emit(item);
  }

  emitRemove(item: CardItem) {
    this.remove.emit(item);
    console.log(this.items);

  }

}
