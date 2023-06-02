import { Injectable } from '@angular/core';

import { map, Observable, tap } from 'rxjs';

import { UsersService } from '@sm-soc/dashboard-sdk';

import { BaseQuery, UseCase } from '../../../common';
import { User2UserVM } from '../../mappers';
import { UsersMemoryService } from '../../memory';
import { UserVM } from '../../model';

@Injectable()
export class GetUsersService
  implements UseCase<Array<UserVM> | null, BaseQuery>
{
  constructor(
    private usersService: UsersService,
    private memoryService: UsersMemoryService
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  exec(data: BaseQuery): Observable<Array<UserVM> | null> {
    return this.usersService.usersControllerFindAll().pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      map((data: any[]) => {
        data = data?.filter((user: UserVM) => user.role !== 'admin');
        return data.map(User2UserVM);
      }),
      tap((users) => {
        this.memoryService.setDataSource(users);
      })
    );
  }
}
