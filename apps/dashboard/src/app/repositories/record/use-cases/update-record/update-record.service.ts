import { Injectable } from '@angular/core';
import { RecordService } from '@medigo/dashboard-sdk';
import { UseCase } from '../../../../common';
import { Observable, map, tap } from 'rxjs';
import { RecordItem2RecordItemVM } from '../../mappers';
import { RecordMemoryService } from '../../memory';
import { RecordItemVM, RecordVM } from '../../model';

@Injectable()
export class UpdateRecordService
  implements UseCase<RecordItemVM | null, RecordVM>
{
  constructor(
    private recordService: RecordService,
    private memoryService: RecordMemoryService
  ) {}

  exec(recordSave: RecordVM): Observable<RecordItemVM | null> {
    return this.recordService
      .recordControllerUpdate(recordSave, recordSave.id || 0)
      .pipe(
        map(RecordItem2RecordItemVM),
        tap((record: RecordItemVM) => {
          this.memoryService.update(record);
        })
      );
  }
}
