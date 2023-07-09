import { TestBed } from '@angular/core/testing';

import { UpdateAvailabilityService } from './update-availability.service';
import { AvailabilityService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { AvailabilityModule } from '../../availability.module';

describe('UpdateAvailabilityService', () => {
  let service: UpdateAvailabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvailabilityService, HttpClient, HttpHandler],
      imports: [AvailabilityModule, ToastModule]
    });
    service = TestBed.inject(UpdateAvailabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
