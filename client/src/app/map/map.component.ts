import {Component, Input, OnInit} from '@angular/core';
import Store from '../_models/store';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {
  @Input() stores: Store[];

  constructor() {
  }

  ngOnInit(): void {
    this.stores = [];
  }

  get mainStore() {
    const defaultStore = new Store();
    defaultStore.name = '';
    defaultStore.location = {
      type: 'Point',
      coordinates: [34.82510580, 32.07536730]
    };
    return this.stores.length ? this.stores[0] : defaultStore;
  }
}
