import { TestBed } from '@angular/core/testing';

import { DoctorService } from './doctor.service';
import { DoctorService as _DoctorService, UsersService as _UsersService, SpecialityService as _SpecialityService } from '@medigo/dashboard-sdk';

import { HttpClient, HttpHandler } from '@angular/common/http';
import { DoctorModule } from './doctor.module';

describe('DoctorService', () => {
  let service: DoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [_DoctorService, _UsersService,
        _SpecialityService, HttpClient, HttpHandler],
      imports: [DoctorModule]
    });
    service = TestBed.inject(DoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
