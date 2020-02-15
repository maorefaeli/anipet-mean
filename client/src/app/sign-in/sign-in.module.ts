import {NgModule} from "@angular/core";
import {SignInComponent} from "./sign-in.component";
import {CookieService} from "ngx-cookie-service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    SignInComponent,
  ],
  imports: [
    CommonModule,
    FormsModule

  ],
  providers: [
    CookieService,
    HttpClientModule
  ],
  exports: [
    SignInComponent
  ],
  bootstrap: []
})
export class SignInModule { }
