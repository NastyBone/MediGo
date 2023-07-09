import { TestBed } from '@angular/core/testing';

import { UpdateRecordService } from './update-record.service';
import { RecordService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { RecordModule } from '../../record.module';

describe('UpdateRecordService', () => {
  let service: UpdateRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      providers: [RecordService, HttpClient, HttpHandler],
      imports: [RecordModule, ToastModule]
    });
    service = TestBed.inject(UpdateRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
