import { TestBed } from '@angular/core/testing';

import { GetReportService } from './get-report.service';
import { ReportsService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ReportModule } from './report.module';
describe('ReportService', () => {
  let service: GetReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportsService, HttpClient, HttpHandler],
      imports: [ReportModule]
    });
    service = TestBed.inject(GetReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
