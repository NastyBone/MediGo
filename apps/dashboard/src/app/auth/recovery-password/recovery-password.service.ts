import { Injectable } from '@angular/core';
// import { AuthService } from '@medigo/dashboard-sdk'; Descomentar
import { Observable, map, of } from 'rxjs';

@Injectable()
export class RecoveryPasswordService {
  //private authService: AuthService //TODO: Descomentar
  constructor() {
    return;
  }

  //
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exec(email: string): Observable<any> {
    // return this.authService
    //   .authControllerGenerateRecovery({ email: email })
    //   .pipe(
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     map((response: any) => {
    //       return { ...response };
    //     })
    //   );
    return of([]); // Descomentar
  }
}
