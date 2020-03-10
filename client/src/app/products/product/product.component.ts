import {Component, Input, OnInit} from '@angular/core';
import Product from "../../_models/product";
import {ProductService} from "../../_services/product.service";
import {PurchaseService} from "../../_services/purchase.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit() {
  }

  public order() {
    this.purchaseService.add(this.product.id);
  }
}
