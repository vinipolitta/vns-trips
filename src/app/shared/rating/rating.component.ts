import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  rates = [1, 2, 3, 4, 5];
  rate = 0;
  previousRate: number;

  @Output() rated = new EventEmitter<any>() ;

  constructor() {}

  ngOnInit(): void {}

  eventChange(eventObject: any) {
    console.log(eventObject);

    this.rated.emit(eventObject)
  }
  getStars(rating: any) {
    var result =
      rating <= this.rate
        ? 'fa fa-star'
        : rating > this.rate
        ? 'fa-regular fa-star'
        : '';
    console.log(result);

    return result;
  }

  setRate(r) {
    this.rate = r;
    this.previousRate = undefined;
    this.rated.emit(this.rate);
  }

  setTemporatyRate(r) {
    if (this.previousRate === undefined) {
      this.previousRate = this.rate;
    }
    this.rate = r;
  }

  clearTemporaryRate() {
    if (this.previousRate !== undefined) {
      this.rate = this.previousRate;
      this.previousRate = undefined;
    }
  }
}
