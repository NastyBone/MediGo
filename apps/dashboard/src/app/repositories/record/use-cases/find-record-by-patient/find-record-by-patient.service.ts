import { Injectable } from '@angular/core';
import { RecordService } from '@medigo/dashboard-sdk';
import { Record2RecordVM } from '../../mappers';
import { BaseQuery } from '../../../../common';
import { Observable, map } from 'rxjs';
import { RecordVM } from '../../model';

@Injectable()
export class FindRecordByPatientService {
  constructor(private recordService: RecordService) {}

  exec(data: BaseQuery): Observable<RecordVM | null> {
    return this.recordService
      .recordControllerFindByPatient(data?.id || 0) //ERROR
      .pipe(map(Record2RecordVM));
  }
}
