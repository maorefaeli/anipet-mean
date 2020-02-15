import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

  constructor() { }

  }
