import { TestBed } from '@angular/core/testing';

import { CreateRecordService } from './create-record.service';
import { RecordService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { RecordModule } from '../../record.module';

describe('CreateRecordService', () => {
  let service: CreateRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      providers: [RecordService, HttpClient, HttpHandler],
      imports: [RecordModule, ToastModule]
    });
    service = TestBed.inject(CreateRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
