import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoresComponent } from './stores/stores.component';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { OrdersComponent } from './orders/orders.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ProductsModule } from "./products/products.module";
import { MatTableModule } from '@angular/material/table';
import { AccountComponent } from './account/account.component';


@NgModule({
  declarations: [
    AppComponent,
    StoresComponent,
    HomeComponent,
    MapComponent,
    SignInComponent,
    SignUpComponent,
    SignOutComponent,
    OrdersComponent,
    AccountComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    ProductsModule,
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
