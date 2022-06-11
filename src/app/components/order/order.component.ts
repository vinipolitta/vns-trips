import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/core/services/order.service';
import { CardItem } from 'src/app/shared/interfaces/card-item';
import { Order, OrderItem } from 'src/app/shared/interfaces/order.model';
import { RadioOption } from 'src/app/shared/interfaces/radio-option.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  coluns = ['Quantities', 'Item', 'Description', 'Subtotal'];

  orderForms: FormGroup;

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartao Debito', value: 'DEB' },
    { label: 'Cartao Refeicao', value: 'REF' },
  ];

  constructor(
    private orderService: OrderService,
    private route: Router,
    private fb: FormBuilder
  ) {}
  delivery = 8;

  ngOnInit(): void {
    console.log(this.cartItem().length === 0);
    this.forms();
  }

  forms() {
    this.orderForms = this.fb.group(
      {
        name: this.fb.control('', [
          Validators.required,
          Validators.minLength(5),
        ]),
        email: this.fb.control('', [Validators.required, Validators.email]),
        emailConf: this.fb.control('', [Validators.required, Validators.email]),
        address: this.fb.control('', [
          Validators.required,
          Validators.minLength(5),
        ]),
        number: this.fb.control('', [Validators.required]),
        optionalAddress: this.fb.control(''),
        paymentOption: this.fb.control('', [Validators.required]),
      },
      { validator: OrderComponent.equalsTo }
    );
  }

  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get('email');
    const emailConf = group.get('emailConf');
    if (!email || !emailConf) {
      return undefined;
    }

    if (email.value !== emailConf.value) {
      return { emailsNotMatch: true };
    }
    return undefined;
  }

  itemsValue(): number {
    return this.orderService.itemValue();
  }

  cartItem(): CardItem[] {
    return this.orderService.cartItems();
  }

  increaseQty(item: CardItem) {
    this.orderService.increaseQty(item);
  }

  decreaseQty(item: CardItem) {
    this.orderService.decreaseQty(item);
  }

  remove(item: CardItem) {
    this.orderService.remove(item);
  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItem().map(
      (item: CardItem) => new OrderItem(item.quantity, item.menuItem.id)
    );
    this.orderService.checkOrder(order).subscribe((orderId: Order) => {
      this.route.navigate(['order/order-summary']);
      this.orderService.clear();
    });
    console.log(order);
  }
}
