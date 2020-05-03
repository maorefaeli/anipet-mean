import { Component, OnInit, ViewChild } from '@angular/core';
import Purchase from '../_models/purchase';
import { PurchaseService } from '../_services/purchase.service';
import { UserService } from '../_services/user.service';
import { Role } from '../_models/user';
import { SocketService } from '../_services/socket.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { colorFadeOut } from '../_animations/template.animations';

const condenseNewLines = (text: string) => text.replace(/\n\s*\n/g, '\n');

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.sass'],
  animations: [colorFadeOut],
})
export class OrdersComponent implements OnInit {
  loading = true;
  isAdmin = false;
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
    // Load orders
    this.purchaseService.get().subscribe(
      purchases => {
        this.dataSource.data = purchases;
        this.loading = false;
      },
      error => {
        this.loading = false;
    });
    
    if (this.userService.currentUser().role === Role.Admin) {
      this.isAdmin = true;
      this.displayedColumns = ['date', 'username', 'productName', 'price', 'address'];

      // Add new orders to the top of the table when they arrive
      this.socketService.onNewPurchase().subscribe(newPurchase => {
        this.dataSource.data.unshift(newPurchase);
        this.table.renderRows();
      });
    } else {
      this.displayedColumns = ['date', 'productName', 'price'];
    }

    this.dataSource.filterPredicate = (data: Purchase, filter: string) => {
      return (
        !filter ||
        data.product.name.toLowerCase().includes(filter) ||
        data.product.price.toString().includes(filter) ||
        (this.isAdmin && data.user.username.toLowerCase().includes(filter))
      );
    };
  }

  getAddress(purchase: Purchase) {
    const u = purchase.user;
    return condenseNewLines(
      `${u.name || ''}
      ${[u.city, u.street, u.postal].filter(x => x).join(', ')}
      ${u.email || ''}
      ${u.phone || ''}`
    ).trim() || 'No Information';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
