import { Component, OnInit } from '@angular/core';
import { StoreService } from '../_services/store.service';
import { PredictionService } from '../_services/prediction.service';
import Store from '../_models/store';
import Product from '../_models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  stores: Store[];
  recommendedProduct: Product;
  
  constructor(
    private storeService: StoreService,
    private predictionService: PredictionService
  ) {
  }
  
  ngOnInit(): void {
    this.storeService.get().subscribe(data => this.stores = data, error => this.stores = []);
    this.predictionService.getProduct().subscribe(data => this.recommendedProduct = data);
  } 
}
