/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { StateService } from '../../common/state';
import { Subscription, finalize } from 'rxjs';
import { GetReportService } from './get-report.service';
import { FormBuilder, FormGroup } from '@angular/forms';
const months = [{
  name: 'Enero',
  value: 0
}, {
  name: 'Febrero',
  value: 1
}, {
  name: 'Marzo',
  value: 2
}, {
  name: 'Abril',
  value: 3
}, {
  name: 'Mayo',
  value: 4
}, {
  name: 'Junio',
  value: 5
}, {
  name: 'Julio',
  value: 6
}, {
  name: 'Agosto',
  value: 7
}, {
  name: 'Septiembre',
  value: 8
}, {
  name: 'Octubre',
  value: 9
}, {
  name: 'Noviembre',
  value: 10
},
{
  name: 'Diciembre',
  value: 11
},]
@Component({
  selector: 'medigo-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit, OnDestroy {
  constructor(
    private stateService: StateService,
    private reportService: GetReportService,
    private formBuider: FormBuilder
  ) { }
  loading = false;
  sub$ = new Subscription();
  actualMonth!: string
  idMonth!: number;
  monthForm!: FormGroup
  MONTHS = months
  pieces!: any
  labels!: any

  data = [
    { name: 'Confirmadas', value: 20 },
    { name: 'No Confirmadas', value: 40 },
  ];
  pie!: any
  @ViewChild('chart') chartContainer!: ElementRef;

  private svg: any;
  private margin = 50;
  private width = 750;
  private height = 500;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors: any;
  public rangeColors = ['#45CD80', '#FF5545', '#00A76C', '#FF1500'];
  ngOnInit(): void {
    this.createForm()
    this.loading = true;
    this.stateService.setLoading(true);
    this.idMonth = (new Date()).getMonth();
    this.actualMonth = new Date(((new Date()).setMonth(this.idMonth))).toLocaleString('es-ES', { month: 'long' });
    this.createSvg();
    this.createColors();
    this.loadData()
  }
  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  private createSvg(): void {

    if (this.data[0].value !== 0 || this.data[1].value !== 0) {
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

  }

  private createColors(): void {
    this.colors = d3
      .scaleOrdinal()
      .domain(this.data.map((d) => d.value.toString()))
      .range(this.rangeColors);
  }

  private drawChart(): void {
    console.log(this.chartContainer)
    this.pie = d3.pie<any>().value((d: any) => Number(d.value));

    if (this.pieces) {
      this.pieces.remove()
    }


    if (this.labels) {
      this.labels.remove()
    }


    this.pieces = this.svg
      .selectAll('pieces')
      .data(this.pie(this.data))
      .enter()
      .append('path')
      .attr('d', d3.arc().innerRadius(0).outerRadius(this.radius))
      .attr('fill', (d: any, i: any) => this.colors(i))
      .attr('stroke', (d: any, i: any) => this.colors(i + 2))
      .style('stroke-width', '25px')
      .style('opacity', (d: any) => {
        return d.value !== 0 ? 0.6 : 0;
      })

    const labelLocation = d3.arc().innerRadius(100).outerRadius(this.radius);

    this.labels = this.svg
      .selectAll('pieces')
      .data(this.pie(this.data))
      .enter()
      .append('text')
      .text((d: any) =>
        d.value !== 0
          ? `${((d.data.value * 100) / (this.data[1].value + this.data[0].value)).toFixed(2)
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

  loadData() {
    this.loading = true;
    this.stateService.setLoading(true);
    this.sub$.add(
      this.reportService
        .exec(this.idMonth)
        .pipe(
          finalize(() => {
            this.loading = false;
            this.stateService.setLoading(false);

          })
        )
        .subscribe((report) => {
          this.data[0].value = report.completed;
          this.data[1].value = report.notCompleted;
          this.drawChart();

        })
    );
  }

  createForm() {
    this.monthForm = this.formBuider.group({
      month: [months[this.idMonth]]
    })
    this.sub$.add(this.monthForm.valueChanges.subscribe(() => {
      this.idMonth = this.monthForm.value['month']
      this.actualMonth = new Date(((new Date()).setMonth(this.idMonth))).toLocaleString('es-ES', { month: 'long' });
      this.loadData()

    }))
  }
  compareObjects(o1: any, o2: any): boolean {
    if (o1 && o2) {
      return o1 === o2;
    } return false
  }
}
