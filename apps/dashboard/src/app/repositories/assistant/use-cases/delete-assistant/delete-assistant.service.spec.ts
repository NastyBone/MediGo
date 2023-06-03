import { TestBed } from '@angular/core/testing';

import { DeleteAssistantService } from './delete-assistant.service';

describe('DeleteAssistantService', () => {
  let service: DeleteAssistantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteAssistantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
