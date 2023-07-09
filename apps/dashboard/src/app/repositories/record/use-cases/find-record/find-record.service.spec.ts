import { TestBed } from '@angular/core/testing';

import { FindRecordService } from './find-record.service';
import { RecordService } from '@medigo/dashboard-sdk';
import { RecordModule } from '../../record.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';

describe('FindRecordService', () => {
  let service: FindRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      providers: [RecordService, HttpClient, HttpHandler],
      imports: [RecordModule, ToastModule]
    });
    service = TestBed.inject(FindRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
