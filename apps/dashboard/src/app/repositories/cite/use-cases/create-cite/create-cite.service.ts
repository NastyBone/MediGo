import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { CiteItem2CiteItemVM } from '../../mappers';
import { CiteMemoryService } from '../../memory';
import { CiteVM, CiteItemVM } from '../../model';
import { CiteService } from '@medigo/dashboard-sdk';

@Injectable()
export class CreateCiteService {
  constructor(
    private citeService: CiteService,
    private memoryService: CiteMemoryService
  ) {}

  exec(CiteSave: CiteVM): Observable<CiteItemVM | null> {
    return this.citeService.citeControllerCreate(CiteSave).pipe(
      map(CiteItem2CiteItemVM),
      tap((cite) => this.memoryService.create(cite))
    );
  }
}
