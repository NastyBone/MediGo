import { TestBed } from '@angular/core/testing';

import { FindRecordService } from './find-record.service';

describe('FindRecordService', () => {
  let service: FindRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
