import { TestBed } from '@angular/core/testing';

import { FindByDayAndDoctorService } from './find-by-day-and-doctor.service';
import { AvailabilityService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { AvailabilityModule } from '../../availability.module';

describe('FindByDayAndDoctorService', () => {
  let service: FindByDayAndDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvailabilityService, HttpClient, HttpHandler],
      imports: [AvailabilityModule, ToastModule]
    });
    service = TestBed.inject(FindByDayAndDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
