import { TestBed } from '@angular/core/testing';

import { FindDoctorBySpecialityService } from './find-doctor-by-speciality.service';
import { DoctorService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { DoctorModule } from '../../doctor.module';

describe('FindDoctorBySpecialityService', () => {
  let service: FindDoctorBySpecialityService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      providers: [DoctorService, HttpClient, HttpHandler],
      imports: [DoctorModule, ToastModule]
    });
    service = TestBed.inject(FindDoctorBySpecialityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
