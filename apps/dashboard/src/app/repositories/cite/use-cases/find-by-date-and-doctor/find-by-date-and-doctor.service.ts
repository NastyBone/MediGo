import { Injectable } from '@angular/core';
import { BaseQuery } from '../../../../common';
import { Observable, map } from 'rxjs';
import { CiteService } from '@medigo/dashboard-sdk';
import { CiteItem2CiteItemVM } from '../../mappers';
import { CiteItemVM, CiteVM } from '../../model';

@Injectable({
  providedIn: 'root',
})
export class FindByDateAndDoctorService {
  constructor(private citeService: CiteService) {}

  exec(data: any): Observable<CiteItemVM[]> {
    return this.citeService
      .citeControllerFindByDoctorAndDate(data.date, data?.id || 0) //ERROR
      .pipe(map((res) => res.map(CiteItem2CiteItemVM)));
  }
}
