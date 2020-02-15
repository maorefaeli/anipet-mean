import {Component, ContentChild, ViewChild, ViewContainerRef} from '@angular/core';
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'anipet';
  hidden = true;
}
