import { Injectable } from '@angular/core';
import { AuthService } from '@medigo/dashboard-sdk';
import { Observable, map, tap } from 'rxjs';
import { UserStateService } from '../../common';
import { UserStateVM } from '../../common/user-state/models';

@Injectable()
export class LoginService {
  constructor(
    private userStateService: UserStateService,
    private authService: AuthService
  ) {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exec(email: string, password: string): Observable<any> {
    return this.authService
      .authControllerLogin({
        email,
        password,
      })
      .pipe(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        map((response: any) => {
          return {
            id: response.id,
            email: response.email,
            name: response.name,
            role: response.role,
            loginStamp: response.loginStamp,
          };
        }),
        tap((user: UserStateVM) => {
          this.userStateService.setUser(user);
        })
      );
  }
  patientExec(email: string, password: string): Observable<any> {
    return this.authService
      .authControllerLoginPatient({
        email,
        password,
      })
      .pipe(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        map((response: any) => {
          return {
            id: response.id,
            email: response.email,
            name: response.name,
            role: response.role,
            loginStamp: response.loginStamp,
          };
        }),
        tap((user: UserStateVM) => {
          this.userStateService.setUser(user);
        })
      );
  }
}
