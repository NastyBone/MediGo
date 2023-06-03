import { TestBed } from '@angular/core/testing';

import { FindAvailabilityService } from './find-availability.service';

describe('FindAvailabilityService', () => {
  let service: FindAvailabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindAvailabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
