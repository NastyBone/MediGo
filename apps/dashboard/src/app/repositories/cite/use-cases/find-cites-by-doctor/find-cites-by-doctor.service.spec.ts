import { TestBed } from '@angular/core/testing';

import { FindCitesByDoctorService } from './find-cites-by-doctor.service';
import { CiteService } from '@medigo/dashboard-sdk';
import { CiteModule } from '../../cite.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';

describe('FindCitesByDoctorService', () => {
  let service: FindCitesByDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CiteService, HttpClient, HttpHandler],
      imports: [CiteModule, ToastModule]
    });
    service = TestBed.inject(FindCitesByDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
