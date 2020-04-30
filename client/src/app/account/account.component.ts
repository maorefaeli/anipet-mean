import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import User from '../_models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit {
  successMessage: String;
  errorMessage: String;
  updateForm: FormGroup;
  loadingUser = true;
  userLoaded = false;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }
  
  get f() { return this.updateForm.controls; }

  private setMessage(message: string, isSuccess: boolean) {
    this.successMessage = '';
    this.errorMessage = '';
    if (isSuccess) {
      this.successMessage = message;
    } else {
      this.errorMessage = message;
    }
  }

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe(
      data => {
        this.initForm(data);
        this.loadingUser = false;
        this.userLoaded = true;
      },
      error => {
        this.setMessage('Problem getting user details', false);
        this.loadingUser = false;
      }
    );
  }

  private initForm(user: User) {
    this.updateForm = this.formBuilder.group({
      name: [user.name],
      city: [user.city],
      street: [user.street],
      postal: [user.postal],
      email: [user.email, Validators.email],
      phone: [user.phone],
    });
  }

  public save() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.updateForm.invalid) {
      return;
    }

    this.loading = true;

    const user: Partial<User> = {
      name: this.f.name.value,
      city: this.f.city.value,
      street: this.f.street.value,
      postal: this.f.postal.value,
      email: this.f.email.value,
      phone: this.f.phone.value,
    }

    this.userService.updateUserDetails(user).subscribe(
      data => {
        this.setMessage('User details saved successfully', true);
        this.loading = false;
      },
      error => {
        this.setMessage('Problem saving user details', false);
        this.loading = false;
      }
    );
  }
}
