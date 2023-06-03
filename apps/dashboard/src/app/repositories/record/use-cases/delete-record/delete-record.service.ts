import { Injectable } from '@angular/core';
import { RecordService } from '@medigo/dashboard-sdk';
import { UseCase } from '../../../../common';
import { Observable, map, tap } from 'rxjs';
import { RecordMemoryService } from '../../memory';

@Injectable()
export class DeleteRecordService implements UseCase<number, number> {
  constructor(
    private recordService: RecordService,
    private memoryService: RecordMemoryService
  ) {}

  exec(id: number): Observable<number> {
    return this.recordService.recordControllerRemove(id).pipe(
      map(() => 1),
      tap(() => {
        this.memoryService.delete(id);
      })
    );
  }
}
