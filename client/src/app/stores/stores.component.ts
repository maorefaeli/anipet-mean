import { Component, OnInit } from '@angular/core';
import { StoreService } from '../_services/store.service';
import Store from '../_models/store';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.sass']
})
export class StoresComponent implements OnInit {
  stores: Store[];

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit() {
    this.storeService.get().subscribe(data => this.stores = data, error => this.stores = []);
  }

}
