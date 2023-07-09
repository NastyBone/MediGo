import { TestBed } from '@angular/core/testing';

import { UpdateSpecialityService } from './update-speciality.service';
import { SpecialityService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { SpecialityModule } from '../../speciality.module';

describe('UpdateSpecialityService', () => {
  let service: UpdateSpecialityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpecialityService, HttpClient, HttpHandler],
      imports: [SpecialityModule, ToastModule]
    });
    service = TestBed.inject(UpdateSpecialityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
