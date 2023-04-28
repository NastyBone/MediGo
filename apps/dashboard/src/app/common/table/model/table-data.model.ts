/* eslint-disable @typescript-eslint/no-explicit-any */
import { RowOptionVM } from './row-option-vm';

export interface TableDataVM<T = any> {
  headers: Array<{
    columnDef: string;
    header: string;
    cell: (element: {
      [key: string]: string | any;
    }) => string | boolean | number;
  }>;
  body: Array<T>;
  options: Array<RowOptionVM<any>>;
}
