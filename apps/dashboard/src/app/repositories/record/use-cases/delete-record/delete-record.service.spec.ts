import { TestBed } from '@angular/core/testing';

import { DeleteRecordService } from './delete-record.service';
import { RecordService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { RecordModule } from '../../record.module';

describe('DeleteRecordService', () => {
  let service: DeleteRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      providers: [RecordService, HttpClient, HttpHandler],
      imports: [RecordModule, ToastModule]
    });
    service = TestBed.inject(DeleteRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
