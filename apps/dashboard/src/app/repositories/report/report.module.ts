import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { ReportService } from './report.service';

@NgModule({
  declarations: [ReportComponent],
  imports: [CommonModule, ReportRoutingModule],
  providers: [ReportService],
})
export class ReportModule {}
