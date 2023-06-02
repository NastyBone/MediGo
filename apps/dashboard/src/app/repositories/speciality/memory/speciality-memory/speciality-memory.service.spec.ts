import { TestBed } from '@angular/core/testing';
import { SpecialityService } from '../../speciality.service';
SpecialityService;
import { SpecialityMemoryService } from './speciality-memory.service';

describe('PlatformsMemoryService', () => {
  let service: SpecialityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpecialityService, SpecialityMemoryService],
    });
    service = TestBed.inject(SpecialityMemoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
