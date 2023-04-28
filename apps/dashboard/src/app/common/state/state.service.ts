import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StateService {
  private isLoading$ = new BehaviorSubject<boolean>(false);

  getLoading$(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  setLoading(isLoading: boolean): void {
    this.isLoading$.next(isLoading);
  }
}
