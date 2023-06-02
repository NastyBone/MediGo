import { Injectable } from '@angular/core';

import { MemoryRepository } from '../../../../common';
import { PatientItemVM } from '../../model';

@Injectable()
export class PatientMemoryService extends MemoryRepository<PatientItemVM> {
  constructor() {
    super();
  }
}
