import { Injectable } from '@angular/core';
import { CreateCiteService } from './use-cases/create-cite/create-cite.service';
import { DeleteCiteService } from './use-cases/delete-cite/delete-cite.service';
import { FindCiteService } from './use-cases/find-cite/find-cite.service';
import { GetCitesService } from './use-cases/get-cites/get-cites.service';
import { UpdateCiteService } from './use-cases/update-cite/update-cite.service';
import { CiteMemoryService } from './memory';
import { ListComponentService } from '../../common/memory-repository/list-component.service';
import { CiteItemVM } from './model';
import { FindCitesByDoctorService } from './use-cases/find-cites-by-doctor/find-cites-by-doctor.service';
import { FindCitesByPatientService } from './use-cases/find-cites-by-patient/find-cites-by-patient.service';
import { Observable, finalize } from 'rxjs';
import { FindByDateAndDoctorService } from './use-cases/find-by-date-and-doctor/find-by-date-and-doctor.service';
import { PatientItemVM } from '../patient/model';
import { GetPatientsService } from '../patient/use-cases/get-patients/get-patients.service';
import { GetSpecialitiesService } from '../speciality/use-cases/get-specialities/get-specialities.service';
import { FindDoctorBySpecialityService } from '../doctor/use-cases/find-doctor-by-speciality/find-doctor-by-speciality.service';
import { SpecialityItemVM } from '../speciality/model/speciality-item-vm';
import { DoctorItemVM } from '../doctor/model';
import { AvailabilityItemVM } from '../availability/model';
import { FindAvailabilityByDoctorService } from '../availability/use-cases/find-availability-by-doctor/find-availability-by-doctor.service';
import { FindByDayAndDoctorService } from '../availability/use-cases/find-by-day-and-doctor/find-by-day-and-doctor.service';
import { GetDoctorsService } from '../doctor/use-cases/get-doctors/get-doctors.service';
import { ReportCitesService } from './use-cases/report-cites/report-cites.service';

@Injectable()
export class CiteService extends ListComponentService<CiteItemVM> {
  constructor(
    public createCiteService: CreateCiteService,
    public deleteCiteService: DeleteCiteService,
    public findCiteService: FindCiteService,
    public getCitesService: GetCitesService,
    public updateCiteService: UpdateCiteService,
    public citesMemoryService: CiteMemoryService,
    public reportCitesService: ReportCitesService,
    public findCiteByDoctor: FindCitesByDoctorService,
    public findCiteByPatient: FindCitesByPatientService,
    public findByDoctorAndDate: FindByDateAndDoctorService,
    public findAvailabilitiesByDoctor: FindAvailabilityByDoctorService,
    public getPatientsService: GetPatientsService,
    public getSpecialities: GetSpecialitiesService,
    public getDoctorsBySpeciality: FindDoctorBySpecialityService,
    public getDoctorsService: GetDoctorsService,
    public findByDoctorAndDay: FindByDayAndDoctorService,

  ) {
    super(
      getCitesService,
      citesMemoryService,
      deleteCiteService,
      createCiteService,
      updateCiteService,
      findCiteService,
      reportCitesService
    );
  }
  findByDoctorId$(id: number): Observable<Array<CiteItemVM> | null> {
    this.setLoading(true);
    this.findCiteByDoctor
      .exec({ id })
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe();
    return this.citesMemoryService.getDataSource$();
  }

  findByPatient$(id: number): Observable<Array<CiteItemVM> | null> {
    this.setLoading(true);
    this.findCiteByPatient
      .exec({ id })
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe();
    return this.citesMemoryService.getDataSource$();
  }

  findByDoctorAndDate$(
    date: string,
    id: number
  ): Observable<Array<AvailabilityItemVM>> {
    this.setLoading(true);
    return this.findByDoctorAndDate
      .exec({ date, id })
      .pipe(finalize(() => this.setLoading(false)));
  }

  findAvailabilitiesByDoctor$(
    id: number
  ): Observable<Array<AvailabilityItemVM>> {
    this.setLoading(true);
    return this.findAvailabilitiesByDoctor
      .exec({ id })
      .pipe(finalize(() => this.setLoading(false)));
  }

  findByDoctorAndDay$(
    date: string,
    id: number
  ): Observable<AvailabilityItemVM[]> {
    this.setLoading(true);
    return this.findByDoctorAndDay
      .exec({ date, id })
      .pipe(finalize(() => this.setLoading(false)));
  }

  getPatients$(load = true): Observable<Array<PatientItemVM> | null> {
    if (load) {
      this.setLoading(load);
    }
    return this.getPatientsService.exec({}).pipe(
      finalize(() => {
        if (load) {
          this.setLoading(false);
        }
      })
    );
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

  getSpecialities$(load = true): Observable<Array<SpecialityItemVM> | null> {
    if (load) {
      this.setLoading(load);
    }
    return this.getSpecialities.exec({}).pipe(
      finalize(() => {
        if (load) {
          this.setLoading(false);
        }
      })
    );
  }

  getDoctorsBySpeciality$(
    id: number,
    load = true
  ): Observable<Array<DoctorItemVM> | null> {
    if (load) {
      this.setLoading(load);
    }
    return this.getDoctorsBySpeciality.exec({ id }).pipe(
      finalize(() => {
        if (load) {
          this.setLoading(false);
        }
      })
    );
  }


}
