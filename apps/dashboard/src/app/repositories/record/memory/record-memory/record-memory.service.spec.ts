import { TestBed } from '@angular/core/testing';
import { RecordService } from '../../record.service';
RecordService;
import { RecordMemoryService } from './record-memory.service';

describe('PlatformsMemoryService', () => {
  let service: RecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecordService, RecordMemoryService],
    });
    service = TestBed.inject(RecordMemoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
