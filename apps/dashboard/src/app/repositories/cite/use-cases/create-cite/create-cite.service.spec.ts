import { TestBed } from '@angular/core/testing';

import { CreateCiteService } from './create-cite.service';
import { CiteService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { CiteModule } from '../../cite.module';

describe('CreateCiteService', () => {
  let service: CreateCiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CiteService, HttpClient, HttpHandler],
      imports: [CiteModule, ToastModule]
    });
    service = TestBed.inject(CreateCiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
