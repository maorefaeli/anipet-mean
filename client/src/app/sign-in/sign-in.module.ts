import {NgModule} from "@angular/core";
import {SignInComponent} from "./sign-in.component";
import {CookieService} from "ngx-cookie-service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    SignInComponent,
  ],
  imports: [
    CommonModule,
    FormsModule

  ],
  providers: [
    CookieService
  ],
  exports: [
    SignInComponent
  ],
  bootstrap: []
})
export class SignInModule { }
