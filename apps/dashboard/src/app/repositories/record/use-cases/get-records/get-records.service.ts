import { Injectable } from '@angular/core';
import { UseCase, BaseQuery } from '../../../../common';
import { Observable, map, tap } from 'rxjs';
import { RecordItem2RecordItemVM } from '../../mappers';
import { RecordMemoryService } from '../../memory';
import { RecordItemVM } from '../../model';
import { RecordService } from '@medigo/dashboard-sdk';

@Injectable()
export class GetRecordsService
  implements UseCase<Array<RecordItemVM> | null, BaseQuery>
{
  constructor(
    private recordsService: RecordService,
    private memoryService: RecordMemoryService
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  exec(data: BaseQuery): Observable<Array<RecordItemVM> | null> {
    return this.recordsService.recordControllerFindAll().pipe(
      map((res) => res.map(RecordItem2RecordItemVM)),
      tap((Record: RecordItemVM[]) => {
        this.memoryService.setDataSource(Record);
      })
    );
  }
}
