/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { map, Observable, take } from 'rxjs';

import { UserStateService } from '../common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserStateService, private router: Router) {
    return;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const userState = this.userService.getUser();

    if (userState) {
      return true;
    } else {
      return this.router.createUrlTree(['login']);
    }
  }
}
