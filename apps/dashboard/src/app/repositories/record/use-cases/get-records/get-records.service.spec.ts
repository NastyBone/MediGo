import { TestBed } from '@angular/core/testing';

import { GetRecordsService } from './get-records.service';
import { RecordService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { RecordModule } from '../../record.module';

describe('GetRecordsService', () => {
  let service: GetRecordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      providers: [RecordService, HttpClient, HttpHandler],
      imports: [RecordModule, ToastModule]
    });
    service = TestBed.inject(GetRecordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
