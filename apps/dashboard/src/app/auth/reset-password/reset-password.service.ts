import { Injectable } from '@angular/core';
// import { AuthService, ChangePasswordDto } from '@medigo/dashboard-sdk'; //TODO: Descomentar
import { Observable, map, of } from 'rxjs';

@Injectable()
export class ResetPasswordService {
  //private authService: AuthService
  constructor() {
    return;
  }

  //newPassword: ChangePasswordDto
  exec(newPassword: any, token: string): Observable<any> {
    // return this.authService
    //   .authControllerPostRecoveryById(newPassword, token)
    //   .pipe(
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     map((response: any) => {
    //       return { ...response };
    //     })
    //   );
    return of([]);
  }

  init(token: string): Observable<any> {
    // return this.authService.authControllerGetRecoveryById(token).pipe(
    //   map((response: any) => {
    //     return { ...response };
    //   })
    // );
    return of([]);
  }
}
