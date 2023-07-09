import { TestBed } from '@angular/core/testing';

import { FindDoctorByUserIdService } from './find-doctor-by-user-id.service';
import { DoctorService } from '@medigo/dashboard-sdk';
import { DoctorModule } from '../../doctor.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';

describe('FindDoctorByUserIdService', () => {
  let service: FindDoctorByUserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoctorService, HttpClient, HttpHandler],
      imports: [DoctorModule, ToastModule]
    });
    service = TestBed.inject(FindDoctorByUserIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
