import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-sumary',
  templateUrl: './order-sumary.component.html',
  styleUrls: ['./order-sumary.component.scss']
})
export class OrderSumaryComponent implements OnInit {

  rated?: any
  constructor() { }

  ngOnInit(): void {
  }

  rate() {
    console.log('teste');

    this.rated = true
  }



}
