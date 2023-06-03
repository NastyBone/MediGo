import { Injectable } from '@angular/core';
import { RecordService } from '@medigo/dashboard-sdk';
import { RecordMemoryService } from '../../memory';
import { Observable, map, tap } from 'rxjs';
import { RecordVM, RecordItemVM } from '../../model';
import { RecordItem2RecordItemVM } from '../../mappers';

@Injectable()
export class CreateRecordService {
  constructor(
    private recordService: RecordService,
    private memoryService: RecordMemoryService
  ) {}

  exec(RecordSave: RecordVM): Observable<RecordItemVM | null> {
    return this.recordService.recordControllerCreate(RecordSave).pipe(
      map(RecordItem2RecordItemVM),
      tap((Record) => this.memoryService.create(Record))
    );
  }
}
