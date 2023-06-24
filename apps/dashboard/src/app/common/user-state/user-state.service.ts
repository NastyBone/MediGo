import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { UserStateVM } from './models';
@Injectable({ providedIn: 'root' })
export class UserStateService {
  constructor() {
    return;
  }

  private user$ = new BehaviorSubject<UserStateVM | null>(null);

  clear(): void {
    this.user$.next(null);
    localStorage.removeItem('medigo-user');
    localStorage.removeItem('medigo-role');
  }

  getUser$(): Observable<UserStateVM | null> {
    return this.user$.asObservable();
  }

  getUser(): UserStateVM | null {
    return this.user$.value || this.getUserStorage();
  }

  setUser(user: UserStateVM | null): void {
    this.user$.next(user);
    localStorage.setItem('medigo-user', JSON.stringify(user));
  }

  setRole(role: unknown): void {
    localStorage.setItem('medigo-role', JSON.stringify(role));
  }

  getUserStorage(): UserStateVM | null {
    let user = null;
    const userString = localStorage.getItem('medigo-user');
    if (userString) {
      user = JSON.parse(userString) as UserStateVM;
    }

    return user;
  }

  getUserId(): number | undefined {
    return this.getUser()?.id;
  }

  getRole(): string {
    return this.getUser()?.role || '';
  }

  getFullRole(): any {
    const data = localStorage.getItem('medigo-role');
    if (data) {
      return JSON.parse(data);
    }
  }
}
