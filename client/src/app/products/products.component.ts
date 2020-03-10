import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {filter, map} from "rxjs/operators";
import product from "../_models/product";
import {ProductService} from "../_services/product.service";
import Product from "../_models/product";
import {ControlContainer, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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

      this.weights.sort((num1: number, num2: number) => num1 - num2);
      for (let weight of this.weights) {
        this.filterForm.addControl("weight" + weight, new FormControl(false));
      }
    });
    this.filterForm = this.formBuilder.group({
      name: [''],
      upToPrice: [''],
    });
  }

  public submit() {
    let maxWeight = 0;
    for (let control in this.form) {
      let weight = this.getWeight(control);
      if (control.indexOf("weight") === 0 && this.form[control].value && weight > maxWeight) {
        maxWeight = weight;
      }
    }

    this.products = this.productService.search(this.form.name.value, maxWeight, this.form.upToPrice.value);
    this.products.subscribe(products => log(products));
  }

  private getWeight(weight: String) {
      return Number.parseFloat(weight.substr("weight".length, weight.length));
  }

  public clearFilters() {
    // for (let control in this.form) {
    //   this.form
    // }
  }
}
