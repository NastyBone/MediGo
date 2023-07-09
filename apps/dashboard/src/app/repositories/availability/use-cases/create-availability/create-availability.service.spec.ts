import { TestBed } from '@angular/core/testing';

import { CreateAvailabilityService } from './create-availability.service';
import { AvailabilityService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { AvailabilityModule } from '../../availability.module';

describe('CreateAvailabilityService', () => {
  let service: CreateAvailabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvailabilityService, HttpClient, HttpHandler],
      imports: [AvailabilityModule, ToastModule]
    });
    service = TestBed.inject(CreateAvailabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
