import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import Product from "../../_models/product";
import {PurchaseService} from "../../_services/purchase.service";
import { UserService, Role } from 'src/app/_services/user.service';
import { ProductService } from 'src/app/_services/product.service';

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

  constructor(
    private purchaseService: PurchaseService,
    private productService: ProductService,
    private userService: UserService) {
  }

  ngOnInit() {
  }

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
      error => this.setMessage(`Order failed: ${error.error.error}`, false)
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
  }

  public stopEdit() {
    this.editMode = false;
  }

  public update() {
    // TODO: complete this
    this.productService.edit(this.product).subscribe(
      data => {
        this.setMessage('Product updated', true);
        this.editMode = false;
      },
      error => this.setMessage('Product could not be updated', false)
    );
  }
}
