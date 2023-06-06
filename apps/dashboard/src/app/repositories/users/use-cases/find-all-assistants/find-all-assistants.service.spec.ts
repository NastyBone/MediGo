import { TestBed } from '@angular/core/testing';

import { FindAllAssistantsService } from './find-all-assistants.service';

describe('FindAllAssistantsService', () => {
  let service: FindAllAssistantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindAllAssistantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
