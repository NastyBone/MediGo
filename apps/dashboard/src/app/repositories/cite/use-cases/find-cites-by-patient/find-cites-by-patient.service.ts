import { Injectable } from '@angular/core';
import { CiteService } from '@medigo/dashboard-sdk';
import { BaseQuery } from '../../../../common';
import { Observable, map } from 'rxjs';
import { CiteItem2CiteItemVM } from '../../mappers';
import { CiteItemVM } from '../../model';

@Injectable()
export class FindCitesByPatientService {
  constructor(private citeService: CiteService) {}

  exec(data: BaseQuery): Observable<CiteItemVM[]> {
    return this.citeService
      .citeControllerFindByPatient(data?.id || 0) //ERROR
      .pipe(map((res) => res.map(CiteItem2CiteItemVM)));
  }
}
