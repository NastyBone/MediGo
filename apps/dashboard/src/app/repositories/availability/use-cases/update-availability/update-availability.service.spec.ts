import { TestBed } from '@angular/core/testing';

import { UpdateAvailabilityService } from './update-availability.service';

describe('UpdateAvailabilityService', () => {
  let service: UpdateAvailabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateAvailabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
