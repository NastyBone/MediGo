import { TestBed } from '@angular/core/testing';

import { FindAssistantService } from './find-assistant.service';
import { AssistantService } from '@medigo/dashboard-sdk';
import { AssistantModule } from '../../assistant.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';

describe('FindAssistantService', () => {
  let service: FindAssistantService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssistantService, HttpClient, HttpHandler],
      imports: [AssistantModule, ToastModule]
    });
    service = TestBed.inject(FindAssistantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
