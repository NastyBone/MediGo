import { Injectable } from '@angular/core';

import { MemoryRepository } from '../../../../common/memory-repository/memory-repository';
import { UserVM } from '../../model';

@Injectable()
export class UsersMemoryService extends MemoryRepository<UserVM> {
  constructor() {
    super();
  }
}
