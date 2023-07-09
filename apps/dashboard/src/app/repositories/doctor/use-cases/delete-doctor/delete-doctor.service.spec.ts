import { TestBed } from '@angular/core/testing';

import { DeleteDoctorService } from './delete-doctor.service';
import { DoctorService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { DoctorModule } from '../../doctor.module';

describe('DeleteDoctorService', () => {
  let service: DeleteDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      providers: [DoctorService, HttpClient, HttpHandler],
      imports: [DoctorModule, ToastModule]
    });
    service = TestBed.inject(DeleteDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
