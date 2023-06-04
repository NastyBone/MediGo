import { Injectable } from '@angular/core';
import { AuthService } from '@medigo/dashboard-sdk';
import { Observable, map, of } from 'rxjs';

@Injectable()
export class RecoveryPasswordService {
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
    return of([]);
  }
}
