import { TestBed } from '@angular/core/testing';
import { DoctorService } from '../../doctor.service';
DoctorService;
import { DoctorMemoryService } from './doctor-memory.service';

describe('PlatformsMemoryService', () => {
  let service: DoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoctorService, DoctorMemoryService],
    });
    service = TestBed.inject(DoctorMemoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
