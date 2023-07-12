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
  selector: 'medigo-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit, OnInit {
  incomingData: TableDataVM = {
    headers: [],
    body: [{ option: '' }],
    options: [
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
    )
      .subscribe((data: TableDataVM) => {
        this.incomingData.headers = [
          ...data.headers,
          { columnDef: 'option', header: '', cell: () => 'option' },
        ];
        this.incomingData.body = [...data.body];
        this.incomingData.options =
          data.options?.length === 0
            ? this.incomingData.options
            : [...data.options];
        this.dataSource = new MatTableDataSource(this.flattenNestedObjects(this.incomingData.body));
        this.displayedColumns = this.incomingData.headers.map(
          (c: any) => {
            return c.columnDef
          }
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

  flattenNestedObjects(array: any[]): any[] {
    const flattened = [];

    for (let i = 0; i < array.length; i++) {
      const obj = array[i];
      const flatObj: any = {};
      for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          const nested = this.flattenNestedObjects([obj[key]]);
          for (const nestedKey in nested[0]) {
            let newKey = `${key}.${nestedKey}`;
            if (flatObj[newKey]) {
              let j = 1;
              while (flatObj[`${newKey}_${j}`]) {
                j++;
              }
              newKey = `${newKey}_${j}`;
            }
            flatObj[newKey] = nested[0][nestedKey];
          }
        } else {
          flatObj[key] = obj[key];
        }
      }
      flattened.push(flatObj);
    }

    return flattened;
  }

}
