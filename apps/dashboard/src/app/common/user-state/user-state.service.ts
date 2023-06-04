import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { UserStateVM } from './models';
import { DoctorService } from '../../repositories/doctor/doctor.service';
import { AssistantService } from '../../repositories/assistant/assistant.service';
import { PatientService } from '../../repositories/patient/patient.service';

@Injectable()
export class UserStateService {
  constructor(
    private doctorsService: DoctorService,
    private assistantService: AssistantService,
    private patientService: PatientService
  ) {}

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

  setRole(user: UserStateVM | null): void {
    let role!: unknown;

    switch (user?.role) {
      case 'assistant': {
        this.sub$.add(
          this.assistantService
            .findByUserId$(user.id)
            .subscribe((assistant) => {
              role = assistant;
            })
        );
        break;
      }
      case 'patient': {
        this.sub$.add(
          this.patientService.findByUser(user.id).subscribe((patient) => {
            role = patient;
          })
        );
        break;
      }
      case 'doctor': {
        this.sub$.add(
          this.doctorsService.findByUserId$(user.id).subscribe((doctor) => {
            role = doctor;
          })
        );
        break;
      }
      default: {
        console.log('ERROR!');
        break;
      }
    }
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
