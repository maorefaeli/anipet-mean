import { Component, OnInit } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})

export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private httpClient: HttpClient) {
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }
  
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    
    // validate
    let data = { username: this.f.username.value, password: this.f.password.value };
    const options = {headers: {'Content-Type': 'application/json'}};
    this.httpClient.post('api/login', JSON.stringify(data), options).subscribe(
      (m: any) => {
        this.cookieService.set('username', data.username);
        this.cookieService.set('isAdmin', m.isAdmin);
      },
      () => {
        this.errorMessage = 'Login failed';
      }
    );

    this.loading = false;
  }
}
