import {AfterViewInit, Component, ElementRef, Host, Input, ViewChild} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {debounceTime, tap} from 'rxjs/operators';
import * as d3 from 'd3';
import {StatisticsService} from "../../../_services/statistics.service";

@Component({
  selector: 'line-chart',
  template: `
    <div class="wrapper">
      <svg #svg/>
      <div *ngIf="loading" class="loader text-center">
        Loading...
        <span class="spinner-border spinner-border-sm mr-1"></span>
      </div>
    </div>
  `,
  styleUrls: ['./line-charts.component.sass']
})
export class LineChartComponent implements AfterViewInit {
  @ViewChild('svg', {static: false}) svgRef: ElementRef<SVGElement>;
  @Input() dataObservable: Observable<any[]>;
  loading = false;

  constructor(@Host() private host: ElementRef<HTMLElement>, private service: StatisticsService) {
  }

  ngAfterViewInit() {
    this.dataObservable.subscribe(rawData => {
      let data: { data: number }[][] = [];
      // let dataArray: { data: number }[] = [];
      // rawData.forEach((value: { date: string, y: number }) => {
      //   dataArray.push({data: value.y})
      // });
      data.push(rawData);
      const {width} = this.host.nativeElement.getBoundingClientRect();
      const height = width / (16 / 9);
      const margin = Math.min(Math.max(width * 0.1, 20), 50);

      const svg = d3.select(this.svgRef.nativeElement)
      this.drawChart(svg, width, height, margin, data);
      fromEvent(window, 'resize')
        .pipe(
          tap(() => this.loading = true),
          debounceTime(300)
        ).subscribe(() => {
        const {width} = this.host.nativeElement.getBoundingClientRect();
        const height = width / (16 / 9);
        const margin = Math.min(Math.max(width * 0.1, 20), 50);
        this.drawChart(svg, width, height, margin, data);
        this.loading = false;
      });
    });
  }

  private drawChart(svg: any, width: number, height: number, margin: number, data: any[]) {
    const chartWidth = width - 2 * margin;
    const chartHeight = height - 2 * margin;
    const n = data[0].length;
    const maxValue = this.getMaxValue(data);

    svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMinYMid');

    svg.selectAll('g').remove();

    const xScale = d3.scalePoint()
      .domain(data[0].map((i) => i.x))
      .range([0, chartWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([chartHeight, 0]);

    const line = d3.line()
      .defined(d => d.x)
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(d3.curveMonotoneX);

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(${margin}, ${chartHeight + margin})`)
      .call(d3.axisBottom(xScale).ticks(Math.min(Math.floor(chartWidth / 25), n)));

    svg.append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${margin}, ${margin})`)
      .call(d3.axisLeft(yScale).ticks(Math.min(Math.floor(chartHeight / 15), maxValue)));

    const colors = ['steelblue', 'orange'];

    data.forEach((serie, i) => {
      svg
        .append('g')
        .attr('transform', `translate(${margin}, ${margin})`)
        .append('path')
        .datum(serie)
        .attr('fill', 'none')
        .attr('stroke', colors[i])
        .attr('stroke-width', 3)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('class', 'line')
        .attr('d', line)
    });
  }

  private getMaxValue(series: { x:number, y: number }[][]): number {
    return series.reduce((serieMax, serie) => {
      return Math.max(serieMax, serie.reduce((max, value) => Math.max(max, value.y), -Infinity))
    }, -Infinity);
  }
}
