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

    public submit() {
      let username = (document.getElementById("username") as HTMLInputElement);
      this.cookieService.set("username", username.value);
      let password = (document.getElementById("password") as HTMLInputElement);

      // validate

      username.value = '';
      password.value = '';
    }
}
