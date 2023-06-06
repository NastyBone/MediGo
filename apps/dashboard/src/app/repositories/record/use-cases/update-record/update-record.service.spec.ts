import { TestBed } from '@angular/core/testing';

import { UpdateRecordService } from './update-record.service';

describe('UpdateRecordService', () => {
  let service: UpdateRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
