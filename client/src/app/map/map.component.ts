import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {
  @Input() stores;

  constructor() {
  }

  ngOnInit() {
    this.stores = [new Store(32.088250, 34.805300, 1),
      new Store(32.081820, 34.815030, 1)];
    let a = 0;
  }
}

class Store {
  public longitude;
  public latitude;
  public opacity;

  constructor(latitude, longitude, opacity) {
    this.longitude = longitude;
    this.latitude = latitude;
    this.opacity = opacity;
  }
}
