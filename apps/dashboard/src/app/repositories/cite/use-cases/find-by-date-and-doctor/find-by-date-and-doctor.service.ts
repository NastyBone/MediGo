import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CiteService } from '@medigo/dashboard-sdk';
import { CiteItem2CiteItemVM } from '../../mappers';
import { CiteItemVM } from '../../model';

@Injectable()
export class FindByDateAndDoctorService {
  constructor(private citeService: CiteService) {}

  exec(data: any): Observable<CiteItemVM[]> {
    return this.citeService
      .citeControllerFindByDoctorAndDate(data.date, data?.id || 0) //ERROR
      .pipe(map((res) => res.map(CiteItem2CiteItemVM)));
  }
}
