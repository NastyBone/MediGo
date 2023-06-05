import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, finalize } from 'rxjs';
import {
  TableDataVM,
  TableService,
  OptionAction,
  ConfirmModalComponent,
} from '../../common';
import { StateService } from '../../common/state';
import { AvailabilityService } from './availability.service';
import { FormComponent } from './form/form.component';
import { AvailabilityVM, RowActionAvailability } from './model';

@Component({
  selector: 'medigo-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss'],
})
export class AvailabilityComponent implements OnInit, OnDestroy {
  //TODO: Fix
  availabilityData: TableDataVM<AvailabilityVM> = {
    headers: [
      {
        columnDef: 'name',
        header: 'Nombre',
        cell: (element: { [key: string]: string }) => `${element['name']}`,
      },
      {
        columnDef: 'price',
        header: 'Precio',
        cell: (element: { [key: string]: string }) => `${element['price']}`,
      },
      {
        columnDef: 'description',
        header: 'Descripción',
        cell: (element: { [key: string]: string }) =>
          `${element['description']}`,
      },
    ],
    body: [],
    options: [],
  };

  sub$ = new Subscription();
  reportForm!: FormGroup;
  disableDateSubmit = true;
  loading = false;

  constructor(
    private matDialog: MatDialog,
    private availabilityService: AvailabilityService,
    private tableService: TableService,
    private stateService: StateService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.loading = true;
    this.stateService.setLoading(this.loading);
    this.sub$.add(
      this.availabilityService
        .getData$()
        .pipe(
          finalize(() => {
            this.loading = false;
            this.stateService.setLoading(this.loading);
          })
        )
        .subscribe((availability: AvailabilityVM[] | null) => {
          this.availabilityData = {
            ...this.availabilityData,
            body: availability || [],
          };
          this.tableService.setData(this.availabilityData);
        })
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
      data: {
        id,
      },
    });
    // modal.componentInstance.closed.subscribe(() => {
    //   modal.close();
    // });
    //TODO: Fix
  }

  showConfirm(availability: AvailabilityVM): void {
    //TODO: Fix
    const dialogRef = this.matDialog.open(ConfirmModalComponent, {
      data: {
        message: {
          title: 'Eliminar Servicio',
          body: `¿Está seguro que desea eliminar el asistente <strong>${availability}</strong>?`,
        },
      },
      hasBackdrop: true,
    });

    dialogRef.componentInstance.closed.subscribe((res) => {
      dialogRef.close();
      if (res) {
        this.availabilityService.delete(availability?.id || 0);
      }
    });
  }
}
