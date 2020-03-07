import { Component, OnInit } from '@angular/core';
import { StoreService } from '../_services/store.service';
import Store from '../_models/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  stores: Store[];
  
  constructor(
    private storeService: StoreService
  ) { }
  
  ngOnInit(): void {
    this.storeService.get().subscribe(data => this.stores = data, error => this.stores = []);
  } 
}
