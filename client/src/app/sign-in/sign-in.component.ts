import { Component } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})

export class SignInComponent {
    username = "";
    pass = "";

    constructor(private cookieService: CookieService) {
    }

    public submit(username, password) {
      document.getElementById("username").textContent = "";
      this.cookieService.set("username", username);
    }
}
