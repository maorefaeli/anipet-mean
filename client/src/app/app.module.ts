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

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    StoresComponent,
    HomeComponent,
    MapComponent,
    SignOutComponent,
    ProductsComponent,
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
      apiKey: 'key'
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
