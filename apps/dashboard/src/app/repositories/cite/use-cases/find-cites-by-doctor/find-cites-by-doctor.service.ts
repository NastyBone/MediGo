import { Injectable } from '@angular/core';
import { CiteService } from '@medigo/dashboard-sdk';
import { BaseQuery } from '../../../../common';
import { Observable, map, tap } from 'rxjs';
import { CiteItem2CiteItemVM } from '../../mappers';
import { CiteItemVM } from '../../model';
import { CiteMemoryService } from '../../memory';

@Injectable()
export class FindCitesByDoctorService {
  constructor(
    private citeService: CiteService,
    private memoryService: CiteMemoryService
  ) {}

  exec(data: BaseQuery): Observable<CiteItemVM[]> {
    return this.citeService
      .citeControllerFindByDoctor(data?.id || 0) //ERROR
      .pipe(
        map((res) => res.map(CiteItem2CiteItemVM)),
        tap((Record: CiteItemVM[]) => {
          this.memoryService.setDataSource(Record);
        })
      );
  }
}
