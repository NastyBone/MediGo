import { TestBed } from '@angular/core/testing';

import { FindAssistantService } from './find-assistant.service';

describe('FindAssistantService', () => {
  let service: FindAssistantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindAssistantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
