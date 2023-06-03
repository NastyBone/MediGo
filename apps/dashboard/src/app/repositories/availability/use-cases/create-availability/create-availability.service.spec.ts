import { TestBed } from '@angular/core/testing';

import { CreateAvailabilityService } from './create-availability.service';

describe('CreateAvailabilityService', () => {
  let service: CreateAvailabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateAvailabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
