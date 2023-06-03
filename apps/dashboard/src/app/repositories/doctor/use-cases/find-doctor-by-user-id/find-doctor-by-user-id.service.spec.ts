import { TestBed } from '@angular/core/testing';

import { FindDoctorByUserIdService } from './find-doctor-by-user-id.service';

describe('FindDoctorByUserIdService', () => {
  let service: FindDoctorByUserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindDoctorByUserIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
