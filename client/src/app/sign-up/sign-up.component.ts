import {Component, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgControl} from "@angular/forms";

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent {
  username = "";
  pass = "";

  constructor() {
  }
  public submit() {
    this.username = "";
    this.pass = "";
  }
}
