import { TestBed } from '@angular/core/testing';

import { GenerateRecordService } from './generate-record.service';
import { RecordService } from '@medigo/dashboard-sdk';
import { RecordModule } from '../../record.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';

describe('GenerateRecordService', () => {
  let service: GenerateRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecordService, HttpClient, HttpHandler],
      imports: [RecordModule, ToastModule]
    });
    service = TestBed.inject(GenerateRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
