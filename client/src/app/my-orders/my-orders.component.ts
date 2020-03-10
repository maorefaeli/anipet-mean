import { Component, OnInit } from '@angular/core';
import Purchase from '../_models/purchase';
import { PurchaseService } from '../_services/purchase.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.sass']
})
export class MyOrdersComponent implements OnInit {
  displayedColumns: string[] = ['date', 'username', 'productName', 'price'];
  purchases: Purchase[] = [];

  constructor(
    private purchaseService: PurchaseService
  ) { }

  ngOnInit() {
    this.purchaseService.get().subscribe(data => this.purchases = data, error => this.purchases = []);
  }

}
