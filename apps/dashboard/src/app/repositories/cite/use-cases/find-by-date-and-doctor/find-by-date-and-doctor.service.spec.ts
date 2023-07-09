import { TestBed } from '@angular/core/testing';

import { FindByDateAndDoctorService } from './find-by-date-and-doctor.service';
import { CiteService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { CiteModule } from '../../cite.module';

describe('FindByDateAndDoctorService', () => {
  let service: FindByDateAndDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CiteService, HttpClient, HttpHandler],
      imports: [CiteModule, ToastModule]
    });
    service = TestBed.inject(FindByDateAndDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
