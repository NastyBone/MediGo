import { Injectable } from '@angular/core';
import { AuthService } from '@medigo/dashboard-sdk';
import { UserStateService } from '../common';
import { Router } from '@angular/router';

@Injectable()
export class AdminService {
  constructor(
    private authService: AuthService,
    private userStateService: UserStateService,
    private router: Router
  ) {
    return;
  }

  logout(): void {
    this.userStateService.clear();
    this.authService.authControllerLogout();
    this.router.navigate([`/login`]);
  }
}
