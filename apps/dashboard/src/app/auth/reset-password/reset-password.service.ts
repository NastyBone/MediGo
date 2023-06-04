import { Injectable } from '@angular/core';
import { AuthService, ChangePasswordDto } from '@medigo/dashboard-sdk';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResetPasswordService {
  constructor(private authService: AuthService) {
    return;
  }

  //newPassword: ChangePasswordDto
  exec(
    newPassword: ChangePasswordDto,
    token: string
  ): Observable<ChangePasswordDto> {
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
