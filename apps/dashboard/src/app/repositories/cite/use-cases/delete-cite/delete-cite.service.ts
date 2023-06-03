import { Injectable } from '@angular/core';
import { CiteService } from '@medigo/dashboard-sdk';
import { UseCase } from '../../../../common';
import { Observable, map, tap } from 'rxjs';
import { CiteMemoryService } from '../../memory';

@Injectable()
export class DeleteCiteService implements UseCase<number, number> {
  constructor(
    private citeService: CiteService,
    private memoryService: CiteMemoryService
  ) {}

  exec(id: number): Observable<number> {
    return this.citeService.citeControllerRemove(id).pipe(
      map(() => 1),
      tap(() => {
        this.memoryService.delete(id);
      })
    );
  }
}
