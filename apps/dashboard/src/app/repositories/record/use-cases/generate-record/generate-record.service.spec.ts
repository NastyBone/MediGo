import { TestBed } from '@angular/core/testing';

import { GenerateRecordService } from './generate-record.service';

describe('GenerateRecordService', () => {
  let service: GenerateRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
