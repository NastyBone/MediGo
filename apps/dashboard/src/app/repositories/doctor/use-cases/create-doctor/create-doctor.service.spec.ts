import { TestBed } from '@angular/core/testing';

import { CreateDoctorService } from './create-doctor.service';

describe('CreateDoctorService', () => {
  let service: CreateDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
