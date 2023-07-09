import { TestBed } from '@angular/core/testing';

import { DeleteAssistantService } from './delete-assistant.service';
import { AssistantService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { AssistantModule } from '../../assistant.module';

describe('DeleteAssistantService', () => {
  let service: DeleteAssistantService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssistantService, HttpClient, HttpHandler],
      imports: [AssistantModule, ToastModule]
    });
    service = TestBed.inject(DeleteAssistantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
