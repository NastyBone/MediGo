import { Injectable } from '@angular/core';
import { RecordService } from '@medigo/dashboard-sdk';
import { UseCase, BaseQuery } from '../../../../common';
import { Observable, map } from 'rxjs';
import { Record2RecordVM } from '../../mappers';
import { RecordVM } from '../../model';

@Injectable()
export class FindRecordService implements UseCase<RecordVM | null, BaseQuery> {
  constructor(private recordService: RecordService) {}

  exec(data: BaseQuery): Observable<RecordVM | null> {
    return this.recordService
      .recordControllerFindOne(data?.id || 0) //ERROR
      .pipe(map(Record2RecordVM));
  }
}
