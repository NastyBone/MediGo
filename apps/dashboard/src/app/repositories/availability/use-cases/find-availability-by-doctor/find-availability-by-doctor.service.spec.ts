import { TestBed } from '@angular/core/testing';

import { FindAvailabilityByDoctorService } from './find-availability-by-doctor.service';
import { AvailabilityService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { AvailabilityModule } from '../../availability.module';

describe('FindAvailabilityByDoctorService', () => {
  let service: FindAvailabilityByDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvailabilityService, HttpClient, HttpHandler],
      imports: [AvailabilityModule, ToastModule]
    });
    service = TestBed.inject(FindAvailabilityByDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
