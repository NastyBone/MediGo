import { TestBed } from '@angular/core/testing';

import { FindDoctorBySpecialityService } from './find-doctor-by-speciality.service';

describe('FindDoctorBySpecialityService', () => {
  let service: FindDoctorBySpecialityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindDoctorBySpecialityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
