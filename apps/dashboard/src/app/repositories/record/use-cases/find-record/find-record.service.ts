import { Injectable } from '@angular/core';
import { RecordService } from '@medigo/dashboard-sdk';
import { UseCase, BaseQuery } from '../../../../common';
import { Observable, map } from 'rxjs';
import { RecordItem2RecordItemVM } from '../../mappers';
import { RecordItemVM } from '../../model';

@Injectable()
export class FindRecordService
  implements UseCase<RecordItemVM | null, BaseQuery>
{
  constructor(private recordService: RecordService) {}

  exec(data: BaseQuery): Observable<RecordItemVM | null> {
    return this.recordService
      .recordControllerFindOne(data?.id || 0) //ERROR
      .pipe(map(RecordItem2RecordItemVM));
  }
}
