import { Injectable } from '@angular/core';
import { CiteService } from '@medigo/dashboard-sdk';
import { Observable, map } from 'rxjs';
@Injectable()
export class ReportCitesService {

  constructor(private citeService: CiteService) { }

  exec(arg: { patientId: number, doctorId: number, start: string, end: string, status: boolean }): Observable<any> {
    return this.citeService.citeControllerReport(arg)
      .pipe(map((data) => data.reportUrl));
  }
}

