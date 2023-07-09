import { TestBed } from '@angular/core/testing';

import { GetCitesService } from './get-cites.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { CiteModule } from '../../cite.module';
import { CiteService } from '@medigo/dashboard-sdk';


describe('GetCitesService', () => {
  let service: GetCitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CiteService, HttpClient, HttpHandler],
      imports: [CiteModule, ToastModule]
    });
    service = TestBed.inject(GetCitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
