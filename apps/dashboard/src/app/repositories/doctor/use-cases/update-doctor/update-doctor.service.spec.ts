import { TestBed } from '@angular/core/testing';

import { UpdateDoctorService } from './update-doctor.service';

describe('UpdateDoctorService', () => {
  let service: UpdateDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
