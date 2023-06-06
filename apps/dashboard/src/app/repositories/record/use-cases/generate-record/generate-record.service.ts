import { Injectable } from '@angular/core';
import { RecordService } from '@medigo/dashboard-sdk';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenerateRecordService {
  constructor(private recordService: RecordService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exec(id: number): Observable<any> {
    return this.recordService.recordControllerReport(id);
  }
}
