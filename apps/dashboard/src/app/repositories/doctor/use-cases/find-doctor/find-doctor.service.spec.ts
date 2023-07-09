import { TestBed } from '@angular/core/testing';

import { FindDoctorService } from './find-doctor.service';
import { DoctorService } from '@medigo/dashboard-sdk';
import { DoctorModule } from '../../doctor.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';

describe('FindDoctorService', () => {
  let service: FindDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      providers: [DoctorService, HttpClient, HttpHandler],
      imports: [DoctorModule, ToastModule]
    });
    service = TestBed.inject(FindDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
