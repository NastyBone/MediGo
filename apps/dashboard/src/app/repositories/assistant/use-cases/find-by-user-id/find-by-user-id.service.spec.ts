import { TestBed } from '@angular/core/testing';

import { FindByUserIdService } from './find-by-user-id.service';
import { AssistantService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { AssistantModule } from '../../assistant.module';

describe('FindByUserIdService', () => {
  let service: FindByUserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssistantService, HttpClient, HttpHandler],
      imports: [AssistantModule, ToastModule]
    });
    service = TestBed.inject(FindByUserIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
