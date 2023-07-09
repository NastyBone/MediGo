import { TestBed } from '@angular/core/testing';

import { FindPatientsCitesByDoctorService } from './find-patients-cites-by-doctor.service';
import { CiteService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { CiteModule } from '../../../cite/cite.module';

describe('FindPatientsCitesByDoctorService', () => {
  let service: FindPatientsCitesByDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      providers: [CiteService, FindPatientsCitesByDoctorService, HttpClient, HttpHandler],
      imports: [CiteModule, ToastModule]
    });
    service = TestBed.inject(FindPatientsCitesByDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
