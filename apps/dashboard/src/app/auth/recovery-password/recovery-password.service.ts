import { Injectable } from '@angular/core';
import { AuthService } from '@tecnops/dashboard-sdk';
import { Observable, map } from 'rxjs';

@Injectable()
export class RecoveryPasswordService {
  //
  constructor(private authService: AuthService) {
    return;
  }

  //
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exec(email: string): Observable<any> {
    return this.authService
      .authControllerGenerateRecovery({ email: email })
      .pipe(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        map((response: any) => {
          return { ...response };
        })
      );
  }
}
