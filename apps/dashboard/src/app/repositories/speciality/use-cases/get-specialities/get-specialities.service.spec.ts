import { TestBed } from '@angular/core/testing';

import { GetSpecialitiesService } from './get-specialities.service';
import { SpecialityService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { SpecialityModule } from '../../speciality.module';

describe('GetSpecialitiesService', () => {
  let service: GetSpecialitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpecialityService, HttpClient, HttpHandler],
      imports: [SpecialityModule, ToastModule]
    });
    service = TestBed.inject(GetSpecialitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
