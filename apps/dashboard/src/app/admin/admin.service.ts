import { Injectable } from '@angular/core';
import { AuthService } from '@medigo/dashboard-sdk';
import { UserStateService } from '../common';

@Injectable()
export class AdminService {
  constructor(
    private authService: AuthService,
    private userStateService: UserStateService
  ) {
    return;
  }

  logout(): void {
    this.userStateService.clear();
    console.log('Logged Out');
    this.authService.authControllerLogout();
  }
}
