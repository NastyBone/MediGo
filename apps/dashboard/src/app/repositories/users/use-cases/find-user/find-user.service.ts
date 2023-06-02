import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { UsersService } from '@medigo/dashboard-sdk';
import { BaseQuery, UseCase } from '../../../common';
import { User2UserVM } from '../../mappers';
import { UserVM } from '../../model';

@Injectable()
export class FindUserService implements UseCase<UserVM | null, BaseQuery> {
  constructor(private usersService: UsersService) {}

  exec(data: BaseQuery): Observable<UserVM | null> {
    return this.usersService
      .usersControllerFindOne(data?.id || 0) //ERROR
      .pipe(map(User2UserVM));
  }
}
