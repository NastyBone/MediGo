import { TestBed } from '@angular/core/testing';

import { ReportCitesService } from './report-cites.service';

describe('ReportCitesService', () => {
  let service: ReportCitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportCitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
