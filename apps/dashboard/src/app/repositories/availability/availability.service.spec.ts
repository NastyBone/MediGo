import { TestBed } from '@angular/core/testing';

import { AvailabilityService } from './availability.service';
import { DoctorService, AvailabilityService as _AvailabilityService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AvailabilityModule } from './availability.module';
describe('AvailabilityService', () => {
  let service: AvailabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [_AvailabilityService, DoctorService, HttpClient, HttpHandler], imports: [AvailabilityModule]
    });
    service = TestBed.inject(AvailabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
