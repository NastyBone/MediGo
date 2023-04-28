import { Injectable } from '@angular/core';
import { AuthService, ChangePasswordDto } from '@tecnops/dashboard-sdk';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResetPasswordService {
  constructor(private authService: AuthService) {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exec(newPassword: ChangePasswordDto, token: string): Observable<any> {
    return this.authService
      .authControllerPostRecoveryById(newPassword, token)
      .pipe(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        map((response: any) => {
          return { ...response };
        })
      );
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  init(token: string): Observable<any> {
    return this.authService.authControllerGetRecoveryById(token).pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      map((response: any) => {
        return { ...response };
      })
    );
  }
}
