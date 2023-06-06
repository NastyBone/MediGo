import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { UserStateVM } from './models';
import { DoctorService } from '../../repositories/doctor/doctor.service';
import { AssistantService } from '../../repositories/assistant/assistant.service';
import { PatientService } from '../../repositories/patient/patient.service';

@Injectable({ providedIn: 'root' })
export class UserStateService {
  constructor() // private patientService: PatientService // private assistantService: AssistantService, // private doctorsService: DoctorService,
  {
    return;
  }

  sub$ = new Subscription();
  private user$ = new BehaviorSubject<UserStateVM | null>(null);

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

  clear(): void {
    this.user$.next(null);
    localStorage.removeItem('medigo-user');
    localStorage.removeItem('medigo-role');
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
}
