import {Component, ElementRef, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {StatisticsService} from "../_services/statistics.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  ordersData: Observable<any[]>;
  productsData: Observable<any[]>;

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit() {
    this.ordersData = this.statisticsService.orders(10);
    this.productsData = this.statisticsService.products(10);
  }
}
