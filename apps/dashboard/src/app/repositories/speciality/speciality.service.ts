import { Injectable } from '@angular/core';
import { CreateSpecialityService } from './use-cases/create-speciality/create-speciality.service';
import { DeleteSpecialityService } from './use-cases/delete-speciality/delete-speciality.service';
import { FindSpecialityService } from './use-cases/find-speciality/find-speciality.service';
import { UpdateSpecialityService } from './use-cases/update-speciality/update-speciality.service';
import { GetSpecialitiesService } from './use-cases/get-specialities/get-specialities.service';
import { SpecialityMemoryService } from './memory';
import { ListComponentService } from '../../common';
import { SpecialityItemVM } from './model';

@Injectable()
export class SpecialityService extends ListComponentService<SpecialityItemVM> {
  constructor(
    public createSpecialityService: CreateSpecialityService,
    public deleteSpecialityService: DeleteSpecialityService,
    public findSpecialityService: FindSpecialityService,
    public getSpecialitysService: GetSpecialitiesService,
    public updateSpecialityService: UpdateSpecialityService,
    public SpecialityMemoryService: SpecialityMemoryService
  ) {
    super(
      getSpecialitysService,
      SpecialityMemoryService,
      deleteSpecialityService,
      createSpecialityService,
      updateSpecialityService,
      findSpecialityService
    );
  }
}
