import { TestBed } from '@angular/core/testing';

import { FindByUserIdService } from './find-by-user-id.service';

describe('FindByUserIdService', () => {
  let service: FindByUserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindByUserIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
