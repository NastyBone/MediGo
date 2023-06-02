import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from './users.service';
import { Subscription } from 'rxjs';
import {
  ConfirmModalComponent,
  OptionAction,
  TableDataVM,
  TableService,
} from '../common';
import { StateService } from '../state';
import { FormComponent } from './form/form.component';
import { RowActionUser, UserVM } from './model';
import { toInteger } from 'lodash';

@Component({
  selector: 'sm-soc-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  data: TableDataVM = {
    headers: [
      {
        columnDef: 'name',
        header: 'Nombre',
        cell: (element: { [key: string]: string }) => `${element['name']}`,
      },
      {
        columnDef: 'email',
        header: 'Correo',
        cell: (element: { [key: string]: string }) => `${element['email']}`,
      },
      {
        columnDef: 'status',
        header: 'Estatus',
        cell: (element: { [key: string]: string | boolean }) =>
          element['status'],
      },
    ],
    body: [],
    options: [],
  };

  sub$ = new Subscription();
  constructor(
    private tableService: TableService,
    private dialog: MatDialog,
    private usersService: UsersService,
    private stateService: StateService
  ) {
    return;
  }

  ngOnInit(): void {
    this.sub$.add(
      this.usersService.getLoading$().subscribe((loading: boolean) => {
        this.stateService.setLoading(loading);
      })
    ); //TODO: ADD
    this.sub$.add(
      this.usersService.getData$().subscribe((users: UserVM[] | null) => {
        this.data = {
          ...this.data,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          body: (users as any) || [],
        };
        this.data.body = this.data.body.map((data) =>
          data['status'] == true
            ? { ...data, status: 'Inactivo' }
            : { ...data, status: 'Activo' }
        );
        this.tableService.setData(this.data);
      })
    );

    this.usersService.get({});
    return;
  }

  optionAction(action: OptionAction) {
    switch (action.option.value) {
      case RowActionUser.update:
        this.showForm(action.data['id']);
        break;
      case RowActionUser.delete:
        this.showConfirmUser({
          id: toInteger(action.data['id']),
          name: action.data['name'],
          email: action.data['name'],
          status: !!action.data['status'],
          role: action.data['role'],
        });
        break;
    }
  }

  ngOnDestroy(): void {
    return;
  }

  showForm(id?: string) {
    const dialogRef = this.dialog.open(FormComponent, {
      hasBackdrop: true,
      disableClose: true,
      data: { id },
    });

    (dialogRef.componentInstance as FormComponent).closed.subscribe(() => {
      dialogRef.close();
    });
  }

  showConfirmUser(user: UserVM): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        message: {
          title: 'Eliminar usuario',
          body: `¿Está seguro que desea eliminar al usuario <strong>${user.name}</strong>?`,
        },
      },
      hasBackdrop: true,
      disableClose: true,
    });

    (dialogRef.componentInstance as ConfirmModalComponent).closed.subscribe(
      (res) => {
        dialogRef.close();
        if (res) {
          this.usersService.delete(user.id);
        }
      }
    );
  }
}
