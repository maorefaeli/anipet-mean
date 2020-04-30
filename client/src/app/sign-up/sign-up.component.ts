import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UserService) {
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }
  
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;

    this.usersService.register(this.f.username.value, this.f.password.value).subscribe(
      data => this.usersService.login(this.f.username.value, this.f.password.value).subscribe(
        data => this.loading = false,
        error => {
          this.errorMessage = 'User is registered but login failed';
          this.loading = false;
        }
      ),
      error => {
        this.errorMessage = `Registration failed: ${error.error.error}`;
        this.loading = false;
      },
    );
  }
}
