import { TestBed } from '@angular/core/testing';

import { UpdateDoctorService } from './update-doctor.service';
import { DoctorService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { DoctorModule } from '../../doctor.module';

describe('UpdateDoctorService', () => {
  let service: UpdateDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      providers: [DoctorService, HttpClient, HttpHandler],
      imports: [DoctorModule, ToastModule]
    });
    service = TestBed.inject(UpdateDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
