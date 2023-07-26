import { Injectable } from '@angular/core';
import { ReportsService } from '@medigo/dashboard-sdk';
import { ReportVM } from '../model';
import { Observable, map } from 'rxjs';
import { Report2ReportVM } from '../mappers';

@Injectable()
export class GetReportService {
  constructor(private reportService: ReportsService) { }

  exec(id: number): Observable<ReportVM> {
    return this.reportService
      .reportControllerFindAll(id)
      .pipe(map(Report2ReportVM));
  }
}
