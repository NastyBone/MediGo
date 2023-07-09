import { TestBed } from '@angular/core/testing';

import { DeleteSpecialityService } from './delete-speciality.service';
import { SpecialityService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { SpecialityModule } from '../../speciality.module';

describe('DeleteSpecialityService', () => {
  let service: DeleteSpecialityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpecialityService, HttpClient, HttpHandler],
      imports: [SpecialityModule, ToastModule]
    });
    service = TestBed.inject(DeleteSpecialityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
