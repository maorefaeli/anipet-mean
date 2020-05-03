import {Component, OnInit} from '@angular/core';
import {StatisticsService, DataPoint} from "../_services/statistics.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  readonly DEFAULT_DAYS = 7;
  days: number;
  ordersData: DataPoint[] = [];
  productsData: DataPoint[] = [];

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit() {
    this.loadData(this.DEFAULT_DAYS);
  }

  applyFilter(event: Event) {
    const filterValue: any = (event.target as HTMLInputElement).value;
    if (filterValue !== this.days) {
      this.loadData(filterValue);
    }
  }

  private loadData(newDaysFilter: number) {
    this.days = newDaysFilter;
    this.statisticsService.orders(this.days).subscribe(
      data => this.ordersData = data,
      error => this.ordersData = []
    );
    this.statisticsService.products(this.days).subscribe(
      data => this.productsData = data,
      error => this.productsData = []
    );
  }
}
