import { TestBed } from '@angular/core/testing';

import { GetAvailabilitiesService } from './get-availabilities.service';
import { AvailabilityService } from '@medigo/dashboard-sdk';
import { AvailabilityModule } from '../../availability.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';

describe('GetAvailabilitiesService', () => {
  let service: GetAvailabilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvailabilityService, HttpClient, HttpHandler],
      imports: [AvailabilityModule, ToastModule]
    });
    service = TestBed.inject(GetAvailabilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
