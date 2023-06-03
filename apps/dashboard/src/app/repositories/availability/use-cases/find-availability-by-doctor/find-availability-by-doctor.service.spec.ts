import { TestBed } from '@angular/core/testing';

import { FindAvailabilityByDoctorService } from './find-availability-by-doctor.service';

describe('FindAvailabilityByDoctorService', () => {
  let service: FindAvailabilityByDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindAvailabilityByDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
