import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent {

  constructor(private userService: UserService) { }

  onSignOut() {
    this.userService.logout();
  }
}