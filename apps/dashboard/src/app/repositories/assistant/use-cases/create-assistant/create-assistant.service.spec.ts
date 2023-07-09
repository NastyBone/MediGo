import { TestBed } from '@angular/core/testing';

import { CreateAssistantService } from './create-assistant.service';
import { AssistantService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { AssistantModule } from '../../assistant.module';

describe('CreateAssistantService', () => {
  let service: CreateAssistantService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssistantService, HttpClient, HttpHandler],
      imports: [AssistantModule, ToastModule]
    });
    service = TestBed.inject(CreateAssistantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
