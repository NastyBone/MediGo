import { TestBed } from '@angular/core/testing';
import { AssistantService } from '../../assistant.service';
import { AssistantMemoryService } from './assistant-memory.service';

describe('PlatformsMemoryService', () => {
  let service: AssistantService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssistantService, AssistantMemoryService],
    });
    service = TestBed.inject(AssistantMemoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
