import { TestBed } from '@angular/core/testing';

import { FindByDayAndDoctorService } from './find-by-day-and-doctor.service';

describe('FindByDayAndDoctorService', () => {
  let service: FindByDayAndDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindByDayAndDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
