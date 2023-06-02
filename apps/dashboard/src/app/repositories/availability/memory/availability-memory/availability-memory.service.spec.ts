import { TestBed } from '@angular/core/testing';
import { AvailabilityService } from '../../availability.service';
import { AvailabilityMemoryService } from './availability-memory.service';

describe('PlatformsMemoryService', () => {
  let service: AvailabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvailabilityService, AvailabilityMemoryService],
    });
    service = TestBed.inject(AvailabilityMemoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
