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
import { FacebookModule } from "ngx-facebook";
import { ProductsComponent } from './products/products.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ProductComponent } from './products/product/product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    AppComponent,
    StoresComponent,
    HomeComponent,
    MapComponent,
    SignInComponent,
    SignUpComponent,
    SignOutComponent,
    ProductsComponent,
    MyOrdersComponent,
    ProductComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    FacebookModule,
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
