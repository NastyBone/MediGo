import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, finalize } from 'rxjs';
import { StateService } from '../../../common/state';
import { GetReportByRangeService } from '../use-cases/get-report-by-range/get-report-by-range.service';
import * as d3 from 'd3';

@Component({
  selector: 'medigo-report-range',
  templateUrl: './report-range.component.html',
  styleUrls: ['./report-range.component.scss']
})
export class ReportRangeComponent implements OnInit, OnDestroy {
  constructor(
    private stateService: StateService,
    private reportService: GetReportByRangeService,
    private formBuider: FormBuilder
  ) { }

  loading = false;
  sub$ = new Subscription();
  reportForm!: FormGroup;
  width = 460
  height = 400
  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  data: any[] = []
  svg: any;
  maxDate = new Date(2100, 11, 31);
  minDate = new Date(2010, 0, 1);
  rangeDate = { start: this.minDate.toISOString(), end: this.maxDate.toISOString() }
  @ViewChild('chart') chartContainer!: ElementRef;

  ngOnInit(): void {
    this.createForm()
    this.loading = true;
    this.stateService.setLoading(true);
    this.createSvg();
    this.loadData();


  }
  ngOnDestroy(): void {
    this.sub$.unsubscribe();
    this.reportForm.reset();
  }

  createForm() {
    this.reportForm = this.formBuider.group({
      start: [null, [Validators.required]],
      end: [null, [Validators.required]]
    })
    this.sub$.add(this.reportForm.valueChanges.subscribe(() => {
      if (this.reportForm.valid) {
        this.loadData();
      }

    }))
  }

  createSvg() {
    if (this.chartContainer) {
      this.svg = d3.select(this.chartContainer.nativeElement)
        .append("svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
        .append("g")
        .attr("transform", `translate(${this.margin.left},${this.margin.top})`);
    }
  }

  loadData() {
    const { start, end } = this.reportForm.value
    if (start !== null && end !== null) {
      this.rangeDate = {
        start: new Date(start).toISOString(),
        end: new Date(end).toISOString()
      }
    }
    this.reportService.exec(this.rangeDate).pipe(finalize(() => {
      this.loading = false;
      this.stateService.setLoading(this.loading);
    })).subscribe((data) => {
      this.data = data;
      this.drawChart()
    })
  }

  drawChart() {
    if (this.svg) {


      this.svg.selectAll("*").remove();
      const counts = d3.rollups(this.data, v => v.length, d => d.name);
      const maxCount = d3.max(counts, d => d[1]);
      const x = d3.scaleBand()
        .domain(counts.map(d => d[0].toString()))
        .range([0, this.width])
        .padding(0.1);
      const y = d3.scaleLinear()
        .domain([0, maxCount || 0])
        .range([this.height, 0]);

      this.svg.append("g")
        .attr("transform", `translate(0,${this.height})`)
        .call(d3.axisBottom(x)).selectAll("text")
        .style("font-size", "16px");

      this.svg.append("g")
        .call(d3.axisLeft(y).tickValues(d3.ticks(0, maxCount || 0, Math.min(maxCount || 0, this.height / 20)).filter(d => Number.isInteger(d)))
          .tickFormat(d3.format(".0f"))).selectAll("text")
        .style("font-size", "16px");

      this.svg.selectAll(".bar")
        .data(counts)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d: any) => x(d[0].toString()))
        .attr("y", (d: any) => y(d[1]))
        .attr("width", x.bandwidth())
        .attr("height", (d: any) => this.height - y(d[1]))
        .attr("fill", "#19ab80");;
    }
  }
}
