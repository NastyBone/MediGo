import { TestBed } from '@angular/core/testing';

import { SpecialityService } from './speciality.service';
import { SpecialityService as _SpecialityService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SpecialityModule } from './speciality.module';

describe('SpecialityService', () => {
  let service: SpecialityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [_SpecialityService, HttpClient, HttpHandler], imports: [SpecialityModule]

    });

    service = TestBed.inject(SpecialityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
