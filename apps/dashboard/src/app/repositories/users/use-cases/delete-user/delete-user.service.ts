import { Injectable } from '@angular/core';

import { map, Observable, tap } from 'rxjs';

import { UsersService } from '@sm-soc/dashboard-sdk';

import { UseCase } from '../../../common';
import { UsersMemoryService } from '../../memory';

@Injectable()
export class DeleteUserService implements UseCase<number, number> {
  constructor(
    private usersService: UsersService,
    private memoryService: UsersMemoryService
  ) {}

  exec(id: number): Observable<number> {
    return this.usersService.usersControllerRemoveUser(id).pipe(
      map(() => 1),
      tap(() => {
        this.memoryService.delete(id);
      })
    );
  }
}
