import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CiteService } from '@medigo/dashboard-sdk';
import { CiteItem2AvailabilityItemVM } from '../../mappers/cite-2-availability-item-vm';
import { AvailabilityItemVM } from '../../../availability/model';

@Injectable()
export class FindByDateAndDoctorService {
  constructor(private citeService: CiteService) {}

  exec(data: any): Observable<AvailabilityItemVM[]> {
    return this.citeService
      .citeControllerFindByDoctorAndDate({ date: data.date }, data?.id || 0) //ERROR
      .pipe(map((res) => res.map(CiteItem2AvailabilityItemVM)));
  }
}
