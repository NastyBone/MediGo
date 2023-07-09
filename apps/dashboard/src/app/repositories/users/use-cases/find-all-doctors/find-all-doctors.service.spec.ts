import { TestBed } from '@angular/core/testing';

import { FindAllDoctorsService } from './find-all-doctors.service';
import { UsersService } from '@medigo/dashboard-sdk';
import { UsersModule } from '../../users.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';

describe('FindAllDoctorsService', () => {
  let service: FindAllDoctorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService, HttpClient, HttpHandler],
      imports: [UsersModule, ToastModule]
    });
    service = TestBed.inject(FindAllDoctorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
