import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

import { isEqual } from 'lodash';
import { Subscription, finalize, Observable, startWith, map, of } from 'rxjs';
import { StateService } from '../../../common/state';
import { CiteService } from '../cite.service';
import { CiteItemVM } from '../model';

import { SpecialityItemVM } from '../../speciality/model';
import { DoctorItemVM } from '../../doctor/model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forbiddenNamesValidator } from '../../../common/forbidden-names-validator.directive';
import { PatientItemVM } from '../../patient/model';
import { AvailabilityItemVM } from '../../availability/model';

@Component({
  selector: 'medigo-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  @Output()
  closed = new EventEmitter();
  submitDisabled = true;
  sub$ = new Subscription();
  oldCiteValue: CiteItemVM = {
    subject: '',
    date: '',
    time: '',
    patientConfirm: false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    doctorId: null as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    patientId: null as any,
  };
  maxDate = new Date(2100, 11, 31);
  minDate = new Date(2000, 0, 1);

  form!: FormGroup;
  loading = false;

  //
  incomingDoctors!: DoctorItemVM[];
  selectedDoctorId!: number;
  doctorControl = new FormControl(this.oldCiteValue.doctor, {
    validators: [Validators.required, forbiddenNamesValidator],
  });
  filteredDoctors!: Observable<DoctorItemVM[]>;
  disableSelectDoctor = false;
  //
  incomingPatients: PatientItemVM[] = [];
  patientControl = new FormControl(this.oldCiteValue.patient, {
    validators: [Validators.required, forbiddenNamesValidator],
  });
  filteredPatients!: Observable<PatientItemVM[]>;
  disableSelectPatient = false;
  //
  incomingSpecialities!: SpecialityItemVM[];
  selectedSpecialityId!: number;
  specialityControl = new FormControl(
    {
      id: 0,
      name: '',
      description: '',
    } as SpecialityItemVM,
    [Validators.required, forbiddenNamesValidator]
  );
  filteredSpecialities!: Observable<SpecialityItemVM[]>;
  //
  incomingAvailabilities: AvailabilityItemVM[] = [];
  availabilityControl = new FormControl(
    {
      id: 0,
    },
    {
      validators: [Validators.required, forbiddenNamesValidator],
    }
  );
  filteredAvaiability!: Observable<AvailabilityItemVM[]>;

  //
  //
  selectable = [
    { name: 'No Confirmada', value: 'false' },
    { name: 'Confirmada', value: 'true' },
  ];
  statusSelect!: string;
  selected!: string;

  //
  dateControl = new FormControl([Validators.required]);
  constructor(
    private citeService: CiteService,
    @Inject(MAT_DIALOG_DATA) public data: DoctorItemVM,
    private stateService: StateService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.stateService.setLoading(this.loading);
    this.sub$.add(
      this.citeService
        .getSpecialities$()
        .pipe(
          finalize(() => {
            this.loading = false;
            this.stateService.setLoading(this.loading);
          })
        )
        .subscribe((specialities) => {
          if (specialities) {
            this.incomingSpecialities = specialities;
            this.filteredSpecialities =
              this.specialityControl.valueChanges.pipe(
                startWith<string | SpecialityItemVM | null | undefined>(''),
                map((value) => {
                  if (value !== null) {
                    return typeof value === 'string' ? value : value?.name;
                  }
                  return '';
                }),
                map((name) => {
                  return name
                    ? this._filterSpecialities(name)
                    : this.incomingSpecialities.slice();
                })
              );
          }
        })
    );
    this.createForm();
    if (this.data.id) {
      this.sub$.add(
        this.citeService
          .find$({ id: this.data.id })
          .pipe(
            finalize(() => {
              this.loading = false;
              this.stateService.setLoading(this.loading);
            })
          )
          .subscribe((cite) => {
            if (cite) {
              this.oldCiteValue = cite;
              this.form.patchValue(
                {
                  ...cite,
                },
                {
                  emitEvent: false,
                }
              );
            }
          })
      );
    }
    this.loading = false;
    this.stateService.setLoading(this.loading);
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  clickClosed(): void {
    this.closed.emit();
  }
  private createForm(): void {
    this.form = this.formBuilder.group({
      subject: [null, [Validators.required, Validators.maxLength(256)]],
      date: this.dateControl,
      time: [null, [Validators.required]],
      patientConfirm: [false, [Validators.required]],
      doctor: this.doctorControl,
      patient: this.patientControl,
    });
    this.sub$.add(
      this.form.valueChanges.subscribe(() => {
        console.log(this.form.controls['doctor']);
        this.submitDisabled =
          isEqual(this.oldCiteValue, this.form.getRawValue()) ||
          this.form.invalid;
      })
    );

    this.sub$.add(
      this.specialityControl.valueChanges.subscribe((speciality) => {
        if (speciality) {
          this.selectedSpecialityId = speciality.id as number;
          // this.filteredSpecialities = of(this.incomingSpecialities);
          this.form.patchValue({
            doctor: null,
            time: null,
          });
          this.loadDoctors();
        }
      })
    );

    this.sub$.add(
      this.doctorControl.valueChanges.subscribe((doctor) => {
        if (doctor) {
          this.selectedDoctorId = doctor.id as number;
          // this.filteredDoctors = of(this.incomingDoctors);
          this.form.patchValue({
            time: null,
          });
          this.loadAvailabilities();
        }
      })
    );

    this.sub$.add(
      this.availabilityControl.valueChanges.subscribe((availability) => {
        if (availability) {
          this.selectedSpecialityId = availability.id as number;
          // this.filteredSpecialities = of(this.incomingSpecialities);
          this.loadAvailabilities();
        }
      })
    );
  }

  clickSave(): void {
    this.form.value.patientConfirm == 'true' ||
    this.form.value.patientConfirm == true
      ? (this.form.value.patientConfirm = true)
      : (this.form.value.patientConfirm = false);
    if (this.data.id) {
      this.update();
    } else {
      this.create();
    }
  }
  private create(): void {
    if (!this.submitDisabled) {
      this.sub$.add(
        this.citeService
          .create({
            ...this.form.value,
          })
          .pipe(
            finalize(() => {
              this.form.reset();
              this.clickClosed();
            })
          )
          .subscribe()
      );
    }
  }

  private update(): void {
    if (!this.submitDisabled) {
      this.sub$.add(
        this.citeService
          .update({
            ...this.form.value,
            id: this.data.id,
          })
          .pipe(
            finalize(() => {
              this.form.reset();
              this.clickClosed();
            })
          )
          .subscribe()
      );
    }
  }
  //
  loadDoctors(): void {
    this.loading = true;
    this.stateService.setLoading(this.loading);
    this.sub$.add(
      this.citeService
        .getDoctorsBySpeciality$(this.selectedSpecialityId)
        .pipe(
          finalize(() => {
            this.loading = false;
            this.stateService.setLoading(this.loading);
          })
        )
        .subscribe((doctors) => {
          if (doctors) {
            this.incomingDoctors = doctors;
            this.filteredDoctors = this.doctorControl.valueChanges.pipe(
              startWith<string | DoctorItemVM | null | undefined>(''),
              map((value) => {
                if (value !== null) {
                  return typeof value === 'string'
                    ? value
                    : value?.user?.firstName + ' ' + value?.user?.lastName;
                }
                return '';
              }),
              map((name) => {
                return name
                  ? this._filterDoctors(name)
                  : this.incomingDoctors.slice();
              })
            );
          }
        })
    );
  }
  //
  loadAvailabilities(): void {
    // const dateValue = this.dateControl.getRawValue();
    // if (dateValue !== null) {
    //   this.loading = true;
    //   this.stateService.setLoading(this.loading);
    //   this.sub$.add(
    //     this.citeService
    //       .findByDoctorAndDate$('', this.selectedDoctorId)
    //       .pipe(
    //         finalize(() => {
    //           this.loading = false;
    //           this.stateService.setLoading(this.loading);
    //         })
    //       )
    //       .subscribe((availabilities) => {
    //         if (availabilities) {
    //           this.incomingAvailabilities = availabilities;
    //           this.filteredSpecialities =
    //             this.specialityControl.valueChanges.pipe(
    //               startWith<string | SpecialityItemVM | null | undefined>(''),
    //               map((value) => {
    //                 if (value !== null) {
    //                   return typeof value === 'string' ? value : value?.name;
    //                 }
    //                 return '';
    //               }),
    //               map((name) => {
    //                 return name
    //                   ? this._filterAvailabilities(name)
    //                   : this.incomingSpecialities.slice();
    //               })
    //             );
    //         }
    //       })
    //   );
    // }
  }
  displayFn(item?: any): string {
    if (item) {
      if (item.name) return item.name;
      if (item.user?.firstName)
        return item.user.firstName + ' ' + item.user.lastName;
    }
    return '';
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  compareObjects(o1: any, o2: any): boolean {
    o1 == 'false' ? (o1 = false) : (o1 = true);
    o2 == 'false' ? (o2 = false) : (o2 = true);
    return o1 === o2;
  }

  private _filterDoctors(name: string): DoctorItemVM[] {
    const filterValue = name.toLowerCase();
    return this.incomingDoctors.filter(
      (option) =>
        (option.user?.firstName + ' ' + option.user?.lastName)
          .toLowerCase()
          .indexOf(filterValue) === 0
    );
  }

  private _filterAvailabilities(name: string): AvailabilityItemVM[] {
    const filterValue = name.toLowerCase();
    return this.incomingAvailabilities.filter(
      (option) =>
        (option.start + ' - ' + option.end)
          .toLowerCase()
          .indexOf(filterValue) === 0
    );
  }

  private _filterSpecialities(name: string): SpecialityItemVM[] {
    const filterValue = name.toLowerCase();
    return this.incomingSpecialities.filter(
      (option) => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  private _filterPatients(name: string): PatientItemVM[] {
    const filterValue = name.toLowerCase();
    return this.incomingPatients.filter(
      (option) =>
        (option.user?.firstName + ' ' + option.user?.lastName)
          .toLowerCase()
          .indexOf(filterValue) === 0
    );
  }
}
