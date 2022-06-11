import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/shared/interfaces/restaurant';

@Component({
  selector: 'app-maket-table',
  templateUrl: './maket-table.component.html',
  styleUrls: ['./maket-table.component.scss']
})
export class MaketTableComponent implements OnInit {
  @Input() coluns = [];
  @Input() dataTables : Restaurant[];


  constructor() { }

  ngOnInit(): void {

  }

}
