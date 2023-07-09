import { TestBed } from '@angular/core/testing';

import { FindCiteService } from './find-cite.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CiteModule } from '../../cite.module';
import { ToastModule } from '@medigo/toast';
import { CiteService } from '@medigo/dashboard-sdk';

describe('FindCiteService', () => {
  let service: FindCiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CiteService, HttpClient, HttpHandler],
      imports: [CiteModule, ToastModule]
    });
    service = TestBed.inject(FindCiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
