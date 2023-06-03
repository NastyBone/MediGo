import { TestBed } from '@angular/core/testing';

import { UpdateAssistantService } from './update-assistant.service';

describe('UpdateAssistantService', () => {
  let service: UpdateAssistantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateAssistantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
