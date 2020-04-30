import { Component, OnInit } from '@angular/core';
import Purchase from '../_models/purchase';
import { PurchaseService } from '../_services/purchase.service';
import { UserService } from '../_services/user.service';
import { Role } from '../_models/user';

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
      this.displayedColumns = ['date', 'username', 'productName', 'price', 'address'];
    } else {
      this.displayedColumns = ['date', 'productName', 'price'];
    }
    this.purchaseService.get().subscribe(data => this.purchases = data, error => this.purchases = []);
  }

  condenseNewLines(text: string) {
    return text.replace(/\n\s*\n/g, '\n');
  }

  getAddress(purchase: Purchase) {
    const u = purchase.user;
    return this.condenseNewLines(`${u.name}\n${u.city}, ${u.street}, ${u.postal}\n${u.email}\n${u.phone}`);
  }
}
