import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import {
  TableDataVM,
  TableService,
  OptionAction,
  ConfirmModalComponent,
  UserStateService,
} from '../../common';
import { StateService } from '../../common/state';
import { AvailabilityService } from './availability.service';
import { FormComponent } from './form/form.component';
import { AvailabilityItemVM, RowActionAvailability } from './model';

@Component({
  selector: 'medigo-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss'],
})
export class AvailabilityComponent implements OnInit, OnDestroy {
  availabilityData: TableDataVM<AvailabilityItemVM> = {
    headers: [
      {
        columnDef: 'doctor',
        header: 'Doctor',
        cell: (element: { [key: string]: string } | any) =>
          `${element['doctor']['user']['firstName']} ${element['doctor']['user']['lastName']}`,
      },
      {
        columnDef: 'day',
        header: 'Día',
        cell: (element: { [key: string]: string }) => `${element['day']}`,
      },
      {
        columnDef: 'start',
        header: 'Inico',
        cell: (element: { [key: string]: string }) => `${element['start']}`,
      },
      {
        columnDef: 'end',
        header: 'Fin',
        cell: (element: { [key: string]: string }) => `${element['end']}`,
      },
      {
        columnDef: 'available',
        header: 'Estado',
        cell: (element: { [key: string]: string }) => `${element['available']}`,
      },
    ],
    body: [],
    options: [],
  };

  sub$ = new Subscription();
  reportForm!: FormGroup;
  disableDateSubmit = true;
  loading = false;
  data!: any;
  role!: any;

  constructor(
    private matDialog: MatDialog,
    private availabilityService: AvailabilityService,
    private tableService: TableService,
    private stateService: StateService,
    private userState: UserStateService
  ) { }
  ngOnInit(): void {
    this.role = this.userState.getRole();
    this.sub$.add(
      this.availabilityService.getLoading$().subscribe((loading) => {
        this.loading = loading;
        this.stateService.setLoading(loading);
      })
    );
    this.sub$.add(
      this.roleBasedData().subscribe(
        (availability: AvailabilityItemVM[] | null) => {
          this.data = availability;
          this.availabilityData = {
            ...this.availabilityData,
            body: availability || [],
            options:
              this.role == 'asistente'
                ? [{ name: 'No disponible', value: null, icon: 'none' }]
                : [],
          };
          this.tableService.setData(this.availabilityData);
        }
      )
    );
  }
  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
  clickAction(option: OptionAction): void {
    switch (option.option.value) {
      case RowActionAvailability.update:
        this.showModal(+option.data['id']);
        break;
      case RowActionAvailability.delete:
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.showConfirm(option.data as any);
        break;
    }
  }

  showModal(id?: number): void {
    const modal = this.matDialog.open(FormComponent, {
      hasBackdrop: true,
      autoFocus: false,
      data: {
        id,
        availabilities: this.data,
        fullRole: this.userState.getFullRole(),
        role: this.userState.getRole(),
      },
    });
    modal.componentInstance.closed.subscribe(() => {
      modal.close();
    });
  }

  showConfirm(availability: AvailabilityItemVM): void {
    const dialogRef = this.matDialog.open(ConfirmModalComponent, {
      data: {
        message: {
          title: 'Eliminar Disponibilidad',
          body: `¿Está seguro que desea eliminar la disponibilidad del  <strong>${availability.start}</strong>? al <strong>${availability.end}</strong>?`,
        },
      },
      hasBackdrop: true,
      autoFocus: false,
    });

    dialogRef.componentInstance.closed.subscribe((res) => {
      dialogRef.close();
      if (res) {
        this.availabilityService.delete(availability?.id || 0);
      }
    });
  }

  private roleBasedData(): Observable<AvailabilityItemVM[] | null> {
    const roleData = this.userState.getFullRole();
    if (roleData) {
      switch (this.role) {
        case 'asistente': {
          return this.availabilityService.findByDoctor$(roleData.doctor.id);
          break;
        }
        case 'doctor': {
          return this.availabilityService.findByDoctor$(roleData.id);
          break;
        }
        default: {
          this.availabilityService.get({});
          return this.availabilityService.getData$();
          break;
        }
      }
    } else return new Observable<null>();
  }
}
