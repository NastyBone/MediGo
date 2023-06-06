import { Injectable } from '@angular/core';
import { RecordService } from '@medigo/dashboard-sdk';
import { BaseQuery } from '../../../../common';
import { Observable, map } from 'rxjs';
import { RecordItem2RecordItemVM } from '../../mappers';
import { RecordItemVM } from '../../model';

@Injectable()
export class FindRecordByDoctorService {
  constructor(private recordService: RecordService) {}

  exec(data: BaseQuery): Observable<RecordItemVM> {
    return this.recordService
      .recordControllerFindByDoctor(data?.id || 0) //ERROR
      .pipe(map(RecordItem2RecordItemVM));
  }
}
