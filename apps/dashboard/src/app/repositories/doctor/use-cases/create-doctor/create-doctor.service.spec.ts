import { TestBed } from '@angular/core/testing';

import { CreateDoctorService } from './create-doctor.service';
import { DoctorService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { DoctorModule } from '../../doctor.module';

describe('CreateDoctorService', () => {
  let service: CreateDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({


      providers: [DoctorService, HttpClient, HttpHandler],
      imports: [DoctorModule, ToastModule]
    });
    service = TestBed.inject(CreateDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
