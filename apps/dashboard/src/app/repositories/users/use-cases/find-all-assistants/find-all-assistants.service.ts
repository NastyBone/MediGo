import { Injectable } from '@angular/core';
import { UsersService } from '@medigo/dashboard-sdk';
import { Observable, map } from 'rxjs';
import { User2UserItemVM } from '../../mappers/user-2-user-item-vm';
import { UserVM } from '../../model';
import { UserPatientVM } from '../../model/user-patient-vm';

@Injectable()
export class FindAllAssistantsService {
  constructor(private usersService: UsersService) {}

  exec(): Observable<Array<UserPatientVM> | null> {
    return this.usersService.usersControllerFindAllAssistants(); //ERROR
    // .pipe(map(User2UserItemVM));
  }
}
