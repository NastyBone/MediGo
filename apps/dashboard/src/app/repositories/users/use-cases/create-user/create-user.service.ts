import { Injectable } from '@angular/core';

import { map, Observable, tap } from 'rxjs';

import { UsersService } from '@medigo/dashboard-sdk';

import { UseCase } from '../../../../common';
import { UsersMemoryService } from '../../memory';
import { SaveUser, UserVM } from '../../model';
import { User2UserItemVM } from '../../mappers/user-2-user-item-vm';

@Injectable()
export class CreateUserService implements UseCase<UserVM | null, SaveUser> {
  constructor(
    private usersService: UsersService,
    private memoryService: UsersMemoryService
  ) { }

  exec(user: SaveUser): Observable<UserVM | null> {
    return this.usersService.usersControllerCreate(user).pipe(
      map((users) => {
        return User2UserItemVM(users);
      }),
      tap((users) => {
        this.memoryService.create(users);
      })
    );
  }
}
