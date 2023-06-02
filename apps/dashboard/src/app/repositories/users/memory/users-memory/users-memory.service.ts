import { Injectable } from '@angular/core';

import { MemoryRepository } from '../../../common';
import { UserVM } from '../../model';

@Injectable()
export class UsersMemoryService extends MemoryRepository<UserVM> {
  constructor() {
    super();
  }
}
