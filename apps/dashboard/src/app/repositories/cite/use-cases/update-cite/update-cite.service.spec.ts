import { TestBed } from '@angular/core/testing';

import { UpdateCiteService } from './update-cite.service';
import { CiteService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { CiteModule } from '../../cite.module';

describe('UpdateCiteService', () => {
  let service: UpdateCiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      providers: [CiteService, HttpClient, HttpHandler],
      imports: [CiteModule, ToastModule]
    });
    service = TestBed.inject(UpdateCiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
