import {NgModule} from "@angular/core";
import {SignUpComponent} from "./sign-up.component";
import {CookieService} from "ngx-cookie-service";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CookieService,
    HttpClientModule
  ],
  exports: [
    SignUpComponent
  ],
  bootstrap: []
})
export class SignUpModule { }
