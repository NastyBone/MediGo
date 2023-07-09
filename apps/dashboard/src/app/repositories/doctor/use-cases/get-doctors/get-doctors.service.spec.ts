import { TestBed } from '@angular/core/testing';

import { GetDoctorsService } from './get-doctors.service';
import { DoctorService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { DoctorModule } from '../../doctor.module';

describe('GetDoctorsService', () => {
  let service: GetDoctorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      providers: [DoctorService, HttpClient, HttpHandler],
      imports: [DoctorModule, ToastModule]
    });
    service = TestBed.inject(GetDoctorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
