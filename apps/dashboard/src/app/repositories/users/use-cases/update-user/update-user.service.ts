import { Injectable } from '@angular/core';

import { map, Observable, tap } from 'rxjs';

import { UsersService } from '@sm-soc/dashboard-sdk';

import { UseCase } from '../../../common';
import { User2UserVM } from '../../mappers';
import { UsersMemoryService } from '../../memory';
import { SaveUser, UserVM } from '../../model';

@Injectable()
export class UpdateUsersService implements UseCase<UserVM | null, SaveUser> {
  constructor(
    private usersService: UsersService,
    private memoryService: UsersMemoryService
  ) {}

  exec(user: SaveUser): Observable<UserVM | null> {
    return this.usersService.usersControllerUpdate(user, user.id || 0).pipe(
      map(User2UserVM),
      tap((user) => {
        this.memoryService.update(user);
      })
    );
  }
}
