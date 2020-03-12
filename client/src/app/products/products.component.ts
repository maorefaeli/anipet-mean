import {Component, OnInit} from '@angular/core';
import {ProductService} from "../_services/product.service";
import Product from "../_models/product";
import { FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filterForm: FormGroup;
  loading = false;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder) {
  }

  get f() { return this.filterForm.controls; }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      name: [''],
      minWeight: [''],
      maxWeight: [''],
      minPrice: [''],
      maxPrice: [''],
    });
    this.submit();
  }

  public submit() {
    this.loading = true;
    this.productService.search(
      this.f.name.value,
      this.f.minWeight.value,
      this.f.maxWeight.value,
      this.f.minPrice.value,
      this.f.maxPrice.value
    ).subscribe(
      data => {
        this.products = data;
        this.loading = false;
      },
      error => {
        this.products = [];
        this.loading = false;
      },
    );
  }

  public clearFilters() {
    for (let control in this.f) {
      this.f[control].reset();
    }
  }

  public removeProductFromList(productId) {
    this.products = this.products.filter(p => p.id !== productId);
  }
}
