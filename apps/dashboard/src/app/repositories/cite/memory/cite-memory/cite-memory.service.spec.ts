import { TestBed } from '@angular/core/testing';
import { CiteService } from '../../cite.service';
CiteService;
import { CiteMemoryService } from './cite-memory.service';

describe('PlatformsMemoryService', () => {
  let service: CiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CiteService, CiteMemoryService],
    });
    service = TestBed.inject(CiteMemoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
