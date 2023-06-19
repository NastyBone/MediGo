import { Injectable } from '@angular/core';
import { CreateAvailabilityService } from './use-cases/create-availability/create-availability.service';
import { DeleteAvailabilityService } from './use-cases/delete-availability/delete-availability.service';
import { FindAvailabilityService } from './use-cases/find-availability/find-availability.service';
import { GetAvailabilitiesService } from './use-cases/get-availabilities/get-availabilities.service';
import { UpdateAvailabilityService } from './use-cases/update-availability/update-availability.service';
import { AvailabilityMemoryService } from './memory';
import { ListComponentService } from '../../common/memory-repository/list-component.service';
import { AvailabilityItemVM } from './model';
import { FindAvailabilityByDoctorService } from './use-cases/find-availability-by-doctor/find-availability-by-doctor.service';
import { Observable, finalize } from 'rxjs';
import { GetDoctorsService } from '../doctor/use-cases/get-doctors/get-doctors.service';
import { DoctorItemVM } from '../doctor/model/doctor-item-vm';

@Injectable()
export class AvailabilityService extends ListComponentService<AvailabilityItemVM> {
  constructor(
    public createAvailabilityService: CreateAvailabilityService,
    public deleteAvailabilityService: DeleteAvailabilityService,
    public findAvailabilityService: FindAvailabilityService,
    public getAvailabilitiesService: GetAvailabilitiesService,
    public updateAvailabilityService: UpdateAvailabilityService,
    public availabilityMemoryService: AvailabilityMemoryService,
    protected findAvailabilityByDoctor: FindAvailabilityByDoctorService,
    private getDoctorsService: GetDoctorsService
  ) {
    super(
      getAvailabilitiesService,
      availabilityMemoryService,
      deleteAvailabilityService,
      createAvailabilityService,
      updateAvailabilityService,
      findAvailabilityService
    );
  }

  findByDoctor$(id: number): Observable<AvailabilityItemVM[] | null> {
    this.setLoading(true);
    this.findAvailabilityByDoctor
      .exec({ id })
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe();
    return this.availabilityMemoryService.getDataSource$();
  }

  getDoctors$(load = true): Observable<Array<DoctorItemVM> | null> {
    if (load) {
      this.setLoading(load);
    }
    return this.getDoctorsService.exec({}).pipe(
      finalize(() => {
        if (load) {
          this.setLoading(false);
        }
      })
    );
  }
}
