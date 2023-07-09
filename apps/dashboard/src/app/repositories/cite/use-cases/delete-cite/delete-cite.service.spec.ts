import { TestBed } from '@angular/core/testing';

import { DeleteCiteService } from './delete-cite.service';
import { CiteService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { CiteModule } from '../../cite.module';

describe('DeleteCiteService', () => {
  let service: DeleteCiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CiteService, HttpClient, HttpHandler],
      imports: [CiteModule, ToastModule]
    });
    service = TestBed.inject(DeleteCiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
