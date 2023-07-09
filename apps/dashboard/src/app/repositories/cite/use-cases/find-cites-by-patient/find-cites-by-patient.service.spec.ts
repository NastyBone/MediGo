import { TestBed } from '@angular/core/testing';

import { FindCitesByPatientService } from './find-cites-by-patient.service';
import { CiteService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { CiteModule } from '../../cite.module';

describe('FindCitesByPatientService', () => {
  let service: FindCitesByPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CiteService, HttpClient, HttpHandler],
      imports: [CiteModule, ToastModule]
    });
    service = TestBed.inject(FindCitesByPatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
