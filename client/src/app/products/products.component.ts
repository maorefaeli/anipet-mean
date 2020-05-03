import {Component, OnInit} from '@angular/core';
import {ProductService} from "../_services/product.service";
import Product from "../_models/product";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { UserService } from '../_services/user.service';
import { positiveNumberValidator } from '../_validators/positiveNumber';
import { Role } from '../_models/user';
import { ActivatedRoute } from '@angular/router';
import { scrollToAndBlink } from '../_animations/template.animations';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  filterForm: FormGroup;
  loadingSearch = false;

  newProductForm: FormGroup;
  loadingNewProduct = false;
  submitted = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {
  }

  get n() { return this.newProductForm.controls; }
  
  get f() { return this.filterForm.controls; }

  public get isAdmin() {
    return this.userService.currentUser().role === Role.Admin;
  }
  
  ngOnInit() {
    this.newProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      weight: ['', positiveNumberValidator()],
      price: ['', positiveNumberValidator()],
      image: [''],
    });

    this.filterForm = this.formBuilder.group({
      name: [''],
      minWeight: [''],
      maxWeight: [''],
      minPrice: [''],
      maxPrice: [''],
    });

    this.search(() => {
      this.route.fragment.subscribe((fragment: string) => {
        setTimeout(() => scrollToAndBlink(fragment), 500);
      })
    });
  }

  public addProduct() {
    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = true;

    // stop here if form is invalid
    if (this.newProductForm.invalid) {
        return;
    }

    this.loadingNewProduct = true;
    this.productService.add(this.n.name.value, this.n.weight.value, this.n.price.value, this.n.image.value).subscribe(
      data => {
        this.products.unshift(data);
        this.successMessage = 'Product added'
        this.loadingNewProduct = false;
      },
      error => {
        this.errorMessage = `Add failed: ${error.error.error}`;
        this.loadingNewProduct = false;
      }
    );
  }

  public search(onLoaded?: () => void) {
    this.loadingSearch = true;
    this.productService.search(
      this.f.name.value,
      this.f.minWeight.value,
      this.f.maxWeight.value,
      this.f.minPrice.value,
      this.f.maxPrice.value
    ).subscribe(
      data => {
        this.products = data;
        this.loadingSearch = false;
        onLoaded && onLoaded();
      },
      error => {
        this.products = [];
        this.loadingSearch = false;
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
