import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent {

  constructor(private userService: UserService) { }

  goToHome() {
    location.href = "/";
  }

  onSignOut() {
    this.userService.logout().subscribe(() => this.goToHome(), () => this.goToHome());
  }
}
