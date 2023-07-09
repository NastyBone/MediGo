import { TestBed } from '@angular/core/testing';

import { CreateSpecialityService } from './create-speciality.service';
import { SpecialityService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { SpecialityModule } from '../../speciality.module';

describe('CreateSpecialityService', () => {
  let service: CreateSpecialityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpecialityService, HttpClient, HttpHandler],
      imports: [SpecialityModule, ToastModule]
    });
    service = TestBed.inject(CreateSpecialityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
