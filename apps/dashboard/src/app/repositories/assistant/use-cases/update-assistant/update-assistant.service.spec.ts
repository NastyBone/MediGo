import { TestBed } from '@angular/core/testing';

import { UpdateAssistantService } from './update-assistant.service';
import { AssistantService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { AssistantModule } from '../../assistant.module';

describe('UpdateAssistantService', () => {
  let service: UpdateAssistantService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssistantService, HttpClient, HttpHandler],
      imports: [AssistantModule, ToastModule]
    });
    service = TestBed.inject(UpdateAssistantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
