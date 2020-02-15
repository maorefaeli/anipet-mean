import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule } from "@angular/forms";
import { StoresComponent } from './stores/stores.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    SignUpComponent,
    StoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    GoogleMapsModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    SignInComponent,
  ]
})
export class AppModule { }
