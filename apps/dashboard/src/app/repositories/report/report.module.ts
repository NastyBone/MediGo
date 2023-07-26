import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { GetReportService } from './use-cases/get-report.service';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { GetReportByRangeService } from './use-cases/get-report-by-range/get-report-by-range.service';
import { MatTabsModule } from '@angular/material/tabs';
import { ReportRangeComponent } from './report-range/report-range.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [ReportComponent, ReportRangeComponent],
  imports: [CommonModule, ReportRoutingModule, MatIconModule, ReactiveFormsModule, MatSelectModule, MatTabsModule, MatDatepickerModule],
  providers: [GetReportService, GetReportByRangeService],
})
export class ReportModule { }
