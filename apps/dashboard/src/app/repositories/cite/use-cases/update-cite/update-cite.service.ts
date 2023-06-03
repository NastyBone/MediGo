import { Injectable } from '@angular/core';
import { UseCase } from '../../../../common';
import { Observable, map, tap } from 'rxjs';
import { CiteItem2CiteItemVM } from '../../mappers';
import { CiteMemoryService } from '../../memory';
import { CiteItemVM, CiteVM } from '../../model';
import { CiteService } from '@medigo/dashboard-sdk';

@Injectable()
export class UpdateCiteService implements UseCase<CiteItemVM | null, CiteVM> {
  constructor(
    private citeService: CiteService,
    private memoryService: CiteMemoryService
  ) {}

  exec(citeSave: CiteVM): Observable<CiteItemVM | null> {
    return this.citeService
      .citeControllerUpdate(citeSave, citeSave.id || 0)
      .pipe(
        map(CiteItem2CiteItemVM),
        tap((cite: CiteItemVM) => {
          this.memoryService.update(cite);
        })
      );
  }
}
