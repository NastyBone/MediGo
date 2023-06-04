import { TestBed } from '@angular/core/testing';

import { ErrorParserService } from './error-parser.service';

describe('ErrorParserService', () => {
  let service: ErrorParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ErrorParserService] });
    service = TestBed.inject(ErrorParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
