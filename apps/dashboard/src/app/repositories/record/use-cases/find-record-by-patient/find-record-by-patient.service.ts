import { Injectable } from '@angular/core';
import { RecordService } from '@medigo/dashboard-sdk';
import { RecordItem2RecordItemVM } from '../../mappers';
import { BaseQuery } from '../../../../common';
import { Observable, map } from 'rxjs';
import { RecordItemVM } from '../../model';

@Injectable()
export class FindRecordByPatientService {
  constructor(private recordService: RecordService) {}

  exec(data: BaseQuery): Observable<RecordItemVM[]> {
    return this.recordService
      .recordControllerFindByPatient(data?.id || 0) //ERROR
      .pipe(map((res) => res.map(RecordItem2RecordItemVM)));
  }
}
