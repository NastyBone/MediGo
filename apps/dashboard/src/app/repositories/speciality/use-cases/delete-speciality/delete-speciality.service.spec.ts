import { TestBed } from '@angular/core/testing';

import { DeleteSpecialityService } from './delete-speciality.service';

describe('DeleteSpecialityService', () => {
  let service: DeleteSpecialityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteSpecialityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
