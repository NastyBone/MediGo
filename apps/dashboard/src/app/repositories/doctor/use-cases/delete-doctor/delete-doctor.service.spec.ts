import { TestBed } from '@angular/core/testing';

import { DeleteDoctorService } from './delete-doctor.service';

describe('DeleteDoctorService', () => {
  let service: DeleteDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
