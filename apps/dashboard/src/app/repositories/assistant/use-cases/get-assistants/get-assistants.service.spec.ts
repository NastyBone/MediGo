import { TestBed } from '@angular/core/testing';

import { GetAssistantsService } from './get-assistants.service';
import { AssistantService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { AssistantModule } from '../../assistant.module';

describe('GetAssistantsService', () => {
  let service: GetAssistantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssistantService, HttpClient, HttpHandler],
      imports: [AssistantModule, ToastModule]
    });
    service = TestBed.inject(GetAssistantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
