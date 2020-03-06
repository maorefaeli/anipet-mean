import {Component, Input, OnInit} from '@angular/core';
import {Product} from "./Product";
import {Observable} from "rxjs/Observable";
import {filter, map} from "rxjs/operators";
import product from "../_models/product";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {
  p: Product[] = [{name: "Cats Food", price: 100, weight: 7, producer: "Go"},
                  {name: "Dogs Food", price: 80, weight: 3.5, producer: "Pro Plan"}];
  products: Observable<Array<Product>>;
  selectedProducts: Observable<Product[]>;
  producers: string[] = [];
  weights: number[] = [];
  minPrice: number = -1;
  maxPrice: number = -1;
  selectedPrice: number = 90;

  constructor() {

  }

  ngOnInit() {
    this.products = new Observable((subscriber => subscriber.next(this.p)));
    this.products.subscribe(products => products.forEach(product => {
      if (this.producers.indexOf(product.producer) === -1) {
        this.producers.push(product.producer);
      }

      if (this.weights.indexOf(product.weight) === -1) {
        this.weights.push(product.weight);
      }

      if (this.minPrice == -1 || this.minPrice > product.price) {
        this.minPrice = product.price;
      }

      if (this.maxPrice < product.price) {
        this.maxPrice = product.price;
      }
    }))
  }

  filterProducer(f: string, selected: boolean) {
    if (selected) {
      this.products.subscribe(products => {
        products.filter(product => product.producer === f);
        this.products = new Observable(subscriber => (subscriber.next(products)))
      });
    } else {
      // this.selectedProducts = this.selectedProducts.filter(product => product.producer !== f);
    }
  }


  // filterWeight(f: number, selected: boolean) {
  //   if (selected) {
  //     this.selectedProducts.concat(this.products.filter(product => product.price === f));
  //   } else {
  //     this.selectedProducts = this.selectedProducts.filter(product => product.price !== f);
  //   }
  // }
}
