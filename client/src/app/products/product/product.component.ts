import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import Product from "../../_models/product";
import {PurchaseService} from "../../_services/purchase.service";
import { UserService, Role } from 'src/app/_services/user.service';
import { ProductService } from 'src/app/_services/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { positiveNumberValidator } from 'src/app/_validators/positiveNumber';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Output() productDeleted = new EventEmitter();
  successMessage: String;
  errorMessage: String;
  editMode = false;
  updateForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private purchaseService: PurchaseService,
    private productService: ProductService,
    private userService: UserService) {
  }

  ngOnInit() {
  }

  get f() { return this.updateForm.controls; }

  public get isAdmin() {
    return this.userService.currentUser().role === Role.Admin;
  }

  private setMessage(message: string, isSuccess: boolean) {
    if (isSuccess) {
      this.successMessage = message;
    } else {
      this.errorMessage = message;
    }
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 5000);
  }

  public order() {
    this.purchaseService.add(this.product.id).subscribe(
      data => this.setMessage(`${this.product.name} was ordered!`, true),
      error => this.setMessage(`Order failed: ${error.status === 401 ? 'Please Sign In' : error.error.error}`, false)
    );
  }

  public delete() {
    this.productService.delete(this.product.id).subscribe(
      data => this.productDeleted.next(),
      error => this.setMessage('Product could not be deleted', false)
    );
  }

  public startEdit() {
    this.editMode = true;
    this.updateForm = this.formBuilder.group({
      name: [this.product.name, Validators.required],
      weight: [this.product.weight, positiveNumberValidator()],
      price: [this.product.price, positiveNumberValidator()],
    });
  }

  public stopEdit() {
    this.editMode = false;
  }

  public update() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.updateForm.invalid) {
        return;
    }

    this.loading = true;

    this.productService.edit(this.product.id, this.f.name.value, this.f.weight.value, this.f.price.value).subscribe(
      data => {
        this.setMessage('Product updated', true);
        this.editMode = false;
        this.loading = false;
        this.product = data;
      },
      error => {
        this.setMessage(`Update failed: ${error.error.error}`, false);
        this.loading = false;
      }
    );
  }
}
