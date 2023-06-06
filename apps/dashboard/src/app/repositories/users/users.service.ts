import { Injectable } from '@angular/core';
import { ListComponentService } from '../../common/memory-repository/list-component.service';
import { UsersMemoryService } from './memory';
import { UserVM } from './model';
import {
  CreateUserService,
  DeleteUserService,
  FindUserService,
  GetUsersService,
  UpdateUsersService,
} from './use-cases';
import { FindAllDoctorsService } from './use-cases/find-all-doctors/find-all-doctors.service';
import { FindAllAssistantsService } from './use-cases/find-all-assistants/find-all-assistants.service';
import { Observable, finalize } from 'rxjs';
import { UserPatientVM } from './model/user-patient-vm';
@Injectable()
export class UsersService extends ListComponentService<UserVM> {
  constructor(
    getService: GetUsersService,
    memoryService: UsersMemoryService,
    deleteService: DeleteUserService,
    createService: CreateUserService,
    updateService: UpdateUsersService,
    findService: FindUserService,
    public findAllDoctorsService: FindAllDoctorsService,
    public findAllAssistantsService: FindAllAssistantsService
  ) {
    super(
      getService,
      memoryService,
      deleteService,
      createService,
      updateService,
      findService
    );
  }

  getDoctors$(load = true): Observable<Array<UserPatientVM> | null> {
    if (load) {
      this.setLoading(load);
    }
    return this.findAllDoctorsService.exec().pipe(
      finalize(() => {
        if (load) {
          this.setLoading(false);
        }
      })
    );
  }

  getAssistants$(load = true): Observable<Array<UserPatientVM> | null> {
    if (load) {
      this.setLoading(load);
    }
    return this.findAllAssistantsService.exec().pipe(
      finalize(() => {
        if (load) {
          this.setLoading(false);
        }
      })
    );
  }
}
