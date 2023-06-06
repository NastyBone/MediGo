import { Injectable } from '@angular/core';
import { UseCase, BaseQuery } from '../../../../common';
import { Observable, map, tap } from 'rxjs';

import { CiteItem2CiteItemVM } from '../../mappers';
import { CiteMemoryService } from '../../memory';
import { CiteItemVM } from '../../model';
import { CiteService } from '@medigo/dashboard-sdk';
@Injectable()
export class GetCitesService
  implements UseCase<Array<CiteItemVM> | null, BaseQuery>
{
  constructor(
    private citesService: CiteService,
    private memoryService: CiteMemoryService
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  exec(data: BaseQuery): Observable<Array<CiteItemVM> | null> {
    return this.citesService.citeControllerFindAll().pipe(
      map((res) => res.map(CiteItem2CiteItemVM)),
      tap((Cite: CiteItemVM[]) => {
        this.memoryService.setDataSource(Cite);
      })
    );
  }
}
