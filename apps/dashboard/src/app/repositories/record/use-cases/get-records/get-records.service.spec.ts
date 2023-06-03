import { TestBed } from '@angular/core/testing';

import { GetRecordsService } from './get-records.service';

describe('GetRecordsService', () => {
  let service: GetRecordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetRecordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
