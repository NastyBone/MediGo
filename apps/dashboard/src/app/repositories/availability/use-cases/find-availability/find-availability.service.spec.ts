import { TestBed } from '@angular/core/testing';

import { FindAvailabilityService } from './find-availability.service';
import { AvailabilityService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { AvailabilityModule } from '../../availability.module';

describe('FindAvailabilityService', () => {
  let service: FindAvailabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvailabilityService, HttpClient, HttpHandler],
      imports: [AvailabilityModule, ToastModule]
    });
    service = TestBed.inject(FindAvailabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
