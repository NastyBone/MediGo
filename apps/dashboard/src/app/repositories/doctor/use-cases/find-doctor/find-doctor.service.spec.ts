import { TestBed } from '@angular/core/testing';

import { FindDoctorService } from './find-doctor.service';

describe('FindDoctorService', () => {
  let service: FindDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
