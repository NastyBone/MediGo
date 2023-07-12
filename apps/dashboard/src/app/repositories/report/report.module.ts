import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { GetReportService } from './get-report.service';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [ReportComponent],
  imports: [CommonModule, ReportRoutingModule, MatIconModule, ReactiveFormsModule, MatSelectModule],
  providers: [GetReportService],
})
export class ReportModule { }
