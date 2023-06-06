import { TestBed } from '@angular/core/testing';

import { GetAssistantsService } from './get-assistants.service';

describe('GetAssistantsService', () => {
  let service: GetAssistantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAssistantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
