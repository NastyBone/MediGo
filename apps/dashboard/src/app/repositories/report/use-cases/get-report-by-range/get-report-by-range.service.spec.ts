import { TestBed } from '@angular/core/testing';

import { GetReportByRangeService } from './get-report-by-range.service';

describe('GetReportByRangeService', () => {
  let service: GetReportByRangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetReportByRangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
