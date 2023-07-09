import { TestBed } from '@angular/core/testing';

import { FindSpecialityService } from './find-speciality.service';
import { SpecialityService } from '@medigo/dashboard-sdk';
import { SpecialityModule } from '../../speciality.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';

describe('FindSpecialityService', () => {
  let service: FindSpecialityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpecialityService, HttpClient, HttpHandler],
      imports: [SpecialityModule, ToastModule]
    });
    service = TestBed.inject(FindSpecialityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
