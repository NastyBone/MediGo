import { TestBed } from '@angular/core/testing';

import { LoggerService } from '@medigo/logger';

import { AlertServiceKey } from './consts';
import { ErrorHandlerService } from './error-handler.service';
import { ErrorParserService } from './error-parser';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ErrorHandlerService,
        {
          provide: LoggerService,
          useValue: {},
        },
        {
          provide: ErrorParserService,
          useValue: {},
        },
        {
          provide: AlertServiceKey,
          useValue: {},
        },
      ],
    });
    service = TestBed.inject(ErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
