import { TestBed } from '@angular/core/testing';

import { FindAllAssistantsService } from './find-all-assistants.service';
import { UsersService } from '@medigo/dashboard-sdk';
import { UsersModule } from '../../users.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';

describe('FindAllAssistantsService', () => {
  let service: FindAllAssistantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService, HttpClient, HttpHandler],
      imports: [UsersModule, ToastModule]
    });
    service = TestBed.inject(FindAllAssistantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
