import { Injectable } from '@angular/core';
import { RecordService } from '@medigo/dashboard-sdk';
import { RecordItem2RecordItemVM } from '../../mappers';
import { BaseQuery } from '../../../../common';
import { Observable, map, tap } from 'rxjs';
import { RecordItemVM } from '../../model';
import { RecordMemoryService } from '../../memory';

@Injectable()
export class FindRecordByPatientService {
  constructor(
    private recordService: RecordService,
    private memoryService: RecordMemoryService
  ) {}

  exec(data: BaseQuery): Observable<RecordItemVM[]> {
    return this.recordService
      .recordControllerFindByPatient(data?.id || 0) //ERROR
      .pipe(
        map((res) => res.map(RecordItem2RecordItemVM)),
        tap((Record: RecordItemVM[]) => {
          this.memoryService.setDataSource(Record);
        })
      );
  }
}
