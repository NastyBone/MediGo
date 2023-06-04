import { Injectable } from '@angular/core';

import { map, Observable, tap } from 'rxjs';

import { UsersService } from '@medigo/dashboard-sdk';

import { UseCase } from '../../../../common';
import { User2UserVM } from '../../mappers';
import { UsersMemoryService } from '../../memory';
import { SaveUser, UserVM } from '../../model';

@Injectable()
export class CreateUserService implements UseCase<UserVM | null, SaveUser> {
  constructor(
    private usersService: UsersService,
    private memoryService: UsersMemoryService
  ) {}

  exec(user: SaveUser): Observable<UserVM | null> {
    return this.usersService.usersControllerCreate(user).pipe(
      map((users) => {
        return User2UserVM(users);
      }),
      tap((users) => {
        this.memoryService.create(users);
      })
    );
  }
}
