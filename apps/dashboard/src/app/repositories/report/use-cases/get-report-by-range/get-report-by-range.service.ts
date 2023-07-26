import { Injectable } from '@angular/core';
import { ReportsService } from '@medigo/dashboard-sdk';
import { Observable, map } from 'rxjs';
import { ReportRange2ReportRangeVM } from '../../mappers/report-range-2report-range-vm';
import { ReportRangeVM } from '../../model';


@Injectable()
export class GetReportByRangeService {

  constructor(private reportsService: ReportsService) { }

  exec(dateRange: { start: string, end: string }): Observable<ReportRangeVM[]> {
    return this.reportsService.reportControllerFindByRange(dateRange).pipe(map((res) => res.map(ReportRange2ReportRangeVM)))
  }
}
