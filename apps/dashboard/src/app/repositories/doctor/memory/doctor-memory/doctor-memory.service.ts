import { Injectable } from '@angular/core';

import { MemoryRepository } from '../../../../common/memory-repository/memory-repository';
import { DoctorItemVM } from '../../model';

@Injectable()
export class DoctorMemoryService extends MemoryRepository<DoctorItemVM> {
  constructor() {
    super();
  }
}
