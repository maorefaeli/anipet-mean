import {NgModule} from "@angular/core";
// import {SignInComponent} from "../sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up.component";
import {CookieService} from "ngx-cookie-service";

@NgModule({
  declarations: [
    SignUpComponent,
  ],
  imports: [

  ],
  providers: [
    CookieService
  ],
  bootstrap: [

  ]
})
export class SignUpModule { }
