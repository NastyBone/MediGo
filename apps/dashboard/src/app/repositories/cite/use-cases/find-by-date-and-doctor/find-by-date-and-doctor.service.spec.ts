import { TestBed } from '@angular/core/testing';

import { FindByDateAndDoctorService } from './find-by-date-and-doctor.service';

describe('FindByDateAndDoctorService', () => {
  let service: FindByDateAndDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindByDateAndDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
