import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { GetReportService } from './get-report.service';

@NgModule({
  declarations: [ReportComponent],
  imports: [CommonModule, ReportRoutingModule],
  providers: [GetReportService],
})
export class ReportModule {}
