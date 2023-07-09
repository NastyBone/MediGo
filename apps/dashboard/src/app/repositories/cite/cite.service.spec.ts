import { TestBed } from '@angular/core/testing';

import { CiteService } from './cite.service';
import { AvailabilityService, DoctorService, PatientService, CiteService as _CiteSerivce } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CiteModule } from './cite.module';
import { SpecialityService } from '../speciality/speciality.service';
import { SpecialityService as _SpecialityService } from '@medigo/dashboard-sdk';
describe('CiteService', () => {
  let service: CiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [_CiteSerivce, HttpClient, HttpHandler, DoctorService, PatientService, AvailabilityService, SpecialityService, _SpecialityService],
      imports: [CiteModule,]
    });
    service = TestBed.inject(CiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
