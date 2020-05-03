import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { StoresComponent } from './stores/stores.component';
import { ProductsComponent } from './products/products.component';
import {StatisticsComponent} from "./statistics/statistics.component";
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'stores', component: StoresComponent },
  { path: 'products', component: ProductsComponent},
  { path: 'account', component: AccountComponent},
  { path: 'statistics', component: StatisticsComponent },
  { path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
