import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ProductService} from "../_services/product.service";
import Product from "../_models/product";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {log} from "util";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {
  products: Observable<Array<Product>>;
  weights: number[] = [];
  filterForm: FormGroup;

  constructor(private productService: ProductService, private formBuilder: FormBuilder) {

  }

  get form() {
    return this.filterForm.controls
  }

  ngOnInit() {
    this.products = this.productService.search();
    this.products.subscribe(products => {
      products.forEach(product => {
        if (this.weights.indexOf(product.weightInKilo) === -1) {
          this.weights.push(product.weightInKilo);
        }
      });
    });
    this.filterForm = this.formBuilder.group({
      name: [''],
      upToPrice: [''],
      weight: ['']
    });
  }

  public submit() {
    this.products = this.productService.search(this.form.name.value, this.form.weight.value, this.form.upToPrice.value);
    this.products.subscribe(products => log(products));
  }

  public clearFilters() {
    for (let control in this.form) {
      this.form[control].reset();
    }
  }
}
