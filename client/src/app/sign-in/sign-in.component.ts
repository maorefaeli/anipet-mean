import { Component } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})

export class SignInComponent {
    username = "";
    pass = "";

    constructor(private cookieService: CookieService, private httpClient: HttpClient) {
    }

    public submit() {
      let username = (document.getElementById("username") as HTMLInputElement).value;
      let password = (document.getElementById("password") as HTMLInputElement).value;

    }
}
