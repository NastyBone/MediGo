import { TestBed } from '@angular/core/testing';

import { AssistantService } from './assistant.service';
import { AssistantService as _AssistantService, UsersService, DoctorService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AssistantModule } from './assistant.module';
describe('AssistantService', () => {
  let service: AssistantService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [_AssistantService, UsersService, DoctorService, HttpClient, HttpHandler], imports: [AssistantModule]
    });
    service = TestBed.inject(AssistantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
