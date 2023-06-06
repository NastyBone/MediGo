import { Injectable } from '@angular/core';
import { CiteService } from '@medigo/dashboard-sdk';
import { UseCase, BaseQuery } from '../../../../common';
import { Observable, map } from 'rxjs';
import { CiteItem2CiteItemVM } from '../../mappers';
import { CiteItemVM } from '../../model';

@Injectable()
export class FindCiteService implements UseCase<CiteItemVM | null, BaseQuery> {
  constructor(private citeService: CiteService) {}

  exec(data: BaseQuery): Observable<CiteItemVM | null> {
    return this.citeService
      .citeControllerFindOne(data?.id || 0) //ERROR
      .pipe(map(CiteItem2CiteItemVM));
  }
}
