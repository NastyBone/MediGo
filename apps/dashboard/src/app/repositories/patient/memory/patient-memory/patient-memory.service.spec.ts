import { TestBed } from '@angular/core/testing';
import { PatientService } from '../../patient.service';
PatientService;
import { PatientMemoryService } from './patient-memory.service';

describe('PlatformsMemoryService', () => {
  let service: PatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientService, PatientMemoryService],
    });
    service = TestBed.inject(PatientMemoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
