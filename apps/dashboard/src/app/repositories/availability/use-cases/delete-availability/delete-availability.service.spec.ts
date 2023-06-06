import { TestBed } from '@angular/core/testing';

import { DeleteAvailabilityService } from './delete-availability.service';

describe('DeleteAvailabilityService', () => {
  let service: DeleteAvailabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteAvailabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
