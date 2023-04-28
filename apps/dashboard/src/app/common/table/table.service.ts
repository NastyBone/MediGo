/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableDataVM } from './model';
@Injectable()
export class TableService {
  constructor() {
    return;
  }

  localData: TableDataVM = { headers: [], body: [], options: [] };
  getData = new BehaviorSubject<TableDataVM>({
    headers: [],
    body: [],
    options: [],
  });

  setData(data: TableDataVM) {
    this.localData.body = [...data.body];
    this.localData.headers = [...data.headers];
    this.localData.options = [...data.options];
    this.getData.next({
      headers: this.localData.headers,
      body: this.localData.body,
      options: this.localData.options,
    });
  }
}
