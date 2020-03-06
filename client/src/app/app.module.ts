import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from "@angular/forms";
import { StoresComponent } from './stores/stores.component';
import { CookieService } from 'ngx-cookie-service';
import { SignInModule } from "./sign-in/sign-in.module";
import { HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { SignUpModule } from './sign-up/sign-up.module';
import { SignOutComponent } from './sign-out/sign-out.component';
import {RouterModule, Routes} from "@angular/router";
import {FacebookModule} from "ngx-facebook";
import { ProductsComponent } from './products/products.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ProductComponent } from './products/product/product.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent },
  { path: 'orders', component: MyOrdersComponent },
  { path: 'stores', component: StoresComponent },
  { path: 'products', component: ProductsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    StoresComponent,
    HomeComponent,
    MapComponent,
    SignOutComponent,
    ProductsComponent,
    MyOrdersComponent,
    ProductComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SignInModule,
    SignUpModule,
    HttpClientModule,
    FacebookModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBeXrVLeXmsD_RUXmg7J_HwlUCTnzSXxMw'
    })
  ],
  providers: [
    CookieService,
    HttpClientModule,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
