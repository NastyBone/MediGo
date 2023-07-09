import { TestBed } from '@angular/core/testing';

import { DeleteAvailabilityService } from './delete-availability.service';
import { AvailabilityService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { AvailabilityModule } from '../../availability.module';

describe('DeleteAvailabilityService', () => {
  let service: DeleteAvailabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvailabilityService, HttpClient, HttpHandler],
      imports: [AvailabilityModule, ToastModule]
    });
    service = TestBed.inject(DeleteAvailabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
