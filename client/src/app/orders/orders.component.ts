import { Component, OnInit, ViewChild } from '@angular/core';
import Purchase from '../_models/purchase';
import { PurchaseService } from '../_services/purchase.service';
import { UserService } from '../_services/user.service';
import { Role } from '../_models/user';
import { SocketService } from '../_services/socket.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { colorFadeOut } from '../_animations/template.animations';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.sass'],
  animations: [colorFadeOut],
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<Purchase>();
  @ViewChild('table', { static: false }) table: MatTable<Purchase>;

  constructor(
    private purchaseService: PurchaseService,
    private userService: UserService,
    private socketService: SocketService
  ) {
  }

  ngOnInit() {
    this.purchaseService.get().subscribe(purchases => this.dataSource.data = purchases);
    
    if (this.userService.currentUser().role === Role.Admin) {
      this.displayedColumns = ['date', 'username', 'productName', 'price', 'address'];

      // Add new orders to the top of the table when they arrive
      this.socketService.onNewPurchase().subscribe(newPurchase => {
        this.dataSource.data.unshift(newPurchase);
        this.table.renderRows();
      });
    } else {
      this.displayedColumns = ['date', 'productName', 'price'];
    }
  }

  condenseNewLines(text: string) {
    return text.replace(/\n\s*\n/g, '\n');
  }

  getAddress(purchase: Purchase) {
    const u = purchase.user;
    return this.condenseNewLines(`${u.name}\n${u.city}, ${u.street}, ${u.postal}\n${u.email}\n${u.phone}`);
  }
}
