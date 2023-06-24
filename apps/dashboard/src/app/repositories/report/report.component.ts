/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { StateService } from '../../common/state';
import { Subscription, finalize } from 'rxjs';
import { GetReportService } from './get-report.service';

@Component({
  selector: 'medigo-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit, OnDestroy {
  constructor(
    private stateService: StateService,
    private reportService: GetReportService
  ) {}
  loading = false;
  sub$ = new Subscription();

  data = [
    { name: 'Confirmadas', value: 20 },
    { name: 'No Confirmadas', value: 40 },
  ];
  @ViewChild('chart') chartContainer!: ElementRef;

  private svg: any;
  private margin = 50;
  private width = 750;
  private height = 600;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors: any;
  public rangeColors = ['#45CD80', '#FF5545', '#00A76C', '#FF1500'];
  ngOnInit(): void {
    this.loading = true;
    this.stateService.setLoading(true);
    this.sub$.add(
      this.reportService
        .exec()
        .pipe(
          finalize(() => {
            this.loading = false;
            this.stateService.setLoading(false);
          })
        )
        .subscribe((report) => {
          this.data[0].value = report.completed;
          this.data[1].value = report.notCompleted;
          this.createSvg();
          this.createColors();
          this.drawChart();
        })
    );
  }
  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  private createSvg(): void {
    this.svg = d3
      .select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      );
  }

  private createColors(): void {
    this.colors = d3
      .scaleOrdinal()
      .domain(this.data.map((d) => d.value.toString()))
      .range(this.rangeColors);
  }

  private drawChart(): void {
    const pie = d3.pie<any>().value((d: any) => Number(d.value));

    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('path')
      .attr('d', d3.arc().innerRadius(0).outerRadius(this.radius))
      .attr('fill', (d: any, i: any) => this.colors(i))
      .attr('stroke', (d: any, i: any) => this.colors(i + 2))
      .style('stroke-width', '25px')
      .style('opacity', (d: any) => {
        return d.value !== 0 ? 0.6 : 0;
      });

    const labelLocation = d3.arc().innerRadius(100).outerRadius(this.radius);

    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('text')
      .text((d: any) =>
        d.value !== 0
          ? `${
              (d.data.value * 100) / (this.data[1].value + this.data[0].value)
            }%`
          : ''
      )
      .attr(
        'transform',
        (d: any) => 'translate(' + labelLocation.centroid(d) + ')'
      )
      .style('text-anchor', 'middle')
      .style('font-size', 30)
      .style('font-family', 'system-ui, sans-serif')
      .style('font-weight', '600');
  }
}
