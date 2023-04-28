/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { isNull } from 'lodash';
import { map } from 'rxjs';
import { UserStateService } from '../user-state';
import { OptionAction, RowOptionVM, TableDataVM } from './model';
import { TableService } from './table.service'; /** Constants used to fill up our data base. */

@Component({
  selector: 'tecnops-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit, OnInit {
  incomingData: TableDataVM = {
    headers: [],
    body: [{ option: '' }],
    options: [
      { name: 'Abrir', value: 'open', icon: 'open_in_new' },
      { name: 'Editar', value: 'update', icon: 'edit' },
      { name: 'Eliminar', value: 'delete', icon: 'delete' },
    ],
  };

  dataSource!: MatTableDataSource<any>;
  displayedColumns!: any;
  @Input() emptyMessage = 'No se encontraron datos';
  @Input() emptySearchMessage = 'Ningún resultado coincide con la busqueda';
  @Output() clickOption = new EventEmitter<OptionAction>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  constructor(
    private tableService: TableService,
    private userState: UserStateService
  ) {
    return;
  }

  ngOnInit(): void {
    this.tableService.getData
      .pipe(
        map((data: TableDataVM) => {
          data.body = data.body.filter((user) => {
            if (user.id === this.userState.getUser()?.id && user.email) {
              return;
            }
            return user;
          });
          return data;
        })
      )
      .subscribe((data: TableDataVM) => {
        this.incomingData.headers = [
          ...data.headers,
          { columnDef: 'option', header: '', cell: () => 'option' },
        ];
        this.incomingData.body = [...data.body];
        this.incomingData.options =
          data.options.length === 0
            ? this.incomingData.options
            : [...data.options];
        this.dataSource = new MatTableDataSource(
          this.fixSource(this.incomingData.body)
        );
        this.displayedColumns = this.incomingData.headers.map(
          (c: any) => c.columnDef
        );
      });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.dataSource.filteredData = [];
  }
  rowAction(option: RowOptionVM<any>, row: { [key: string]: string }) {
    this.clickOption.emit({ option: option, data: row });
  }

  private fixSource(body: any[]): any[] {
    if (body.length > 0) {
      return this.incomingData.body.map((body) => {
        const id = body.id;
        let reqId!: number;
        let orderPrice!: number;
        if (body.request) {
          reqId = body.request.id;
        }
        if (body.providerFirstName) {
          orderPrice = body.price;
        }
        const rawObject = Object.assign(
          {},
          ...(function _flatten(o): any {
            return [].concat(
              ...Object.keys(o).map((k: any) => {
                if (typeof o[k] === 'object' && !isNull(o[k]) && o[k].length) {
                  return { [k]: o[k] };
                } else if (typeof o[k] === 'object') {
                  if (!isNull(o[k])) {
                    return _flatten(o[k]);
                  }
                } else {
                  if (k == 'id') {
                    return { [k]: id };
                  }
                  if (k == 'role') {
                    return {
                      [k]: (o[k] as string)
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, function (str) {
                          return str.toUpperCase();
                        }),
                    };
                  }
                  return { [k]: o[k] };
                }
              })
            );
          })(body)
        );
        if (reqId) rawObject.reqId = reqId;
        if (orderPrice) rawObject.orderPrice = orderPrice;
        return rawObject;
      });
    }
    return [];
  }
}
