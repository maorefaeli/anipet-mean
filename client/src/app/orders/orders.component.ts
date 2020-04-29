import { Component, OnInit } from '@angular/core';
import Purchase from '../_models/purchase';
import { PurchaseService } from '../_services/purchase.service';
import { UserService, Role } from '../_services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.sass']
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = [];
  purchases: Purchase[] = [];

  constructor(
    private purchaseService: PurchaseService,
    private userService: UserService
  ) { }

  ngOnInit() {
    if (this.userService.currentUser().role === Role.Admin) {
      this.displayedColumns = ['date', 'username', 'productName', 'price'];
    } else {
      this.displayedColumns = ['date', 'productName', 'price'];
    }
    this.purchaseService.get().subscribe(data => this.purchases = data, error => this.purchases = []);
  }
}
