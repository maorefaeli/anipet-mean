import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  stores = {1: {"latitude": "32.088250", 'longitude': "34.805300", "opacity":"0"}, 2: {"latitude":"32.081820", "longitude":"34.815030", "opacity":"0"}};
  constructor() { }

}
