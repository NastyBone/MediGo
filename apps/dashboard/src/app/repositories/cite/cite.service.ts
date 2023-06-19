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

@Injectable()
export class CiteService extends ListComponentService<CiteItemVM> {
  constructor(
    public createCiteService: CreateCiteService,
    public deleteCiteService: DeleteCiteService,
    public findCiteService: FindCiteService,
    public getCitesService: GetCitesService,
    public updateCiteService: UpdateCiteService,
    public citesMemoryService: CiteMemoryService,
    public findCiteByDoctor: FindCitesByDoctorService,
    public findCiteByPatient: FindCitesByPatientService,
    public findCitesByDoctorAndDate: FindByDateAndDoctorService
  ) {
    super(
      getCitesService,
      citesMemoryService,
      deleteCiteService,
      createCiteService,
      updateCiteService,
      findCiteService
    );
  }
  referData!: {
    reqId: number | null;
    indexes: number[];
  };
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
  ): Observable<Array<CiteItemVM>> {
    this.setLoading(true);
    return this.findCitesByDoctorAndDate
      .exec({ date, id })
      .pipe(finalize(() => this.setLoading(false)));
  }

  setRef(ref: { reqId: number | null; indexes: number[] }) {
    this.referData = ref;
  }
}
