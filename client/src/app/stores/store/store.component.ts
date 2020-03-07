import {Component, Input, OnInit} from '@angular/core';
import Store from '../../_models/store';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.sass']
})
export class StoreComponent implements OnInit {
  @Input() store: Store;

  constructor() { }

  ngOnInit() {
    
  }

}
