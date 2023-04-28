import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TableComponent } from './table.component';
import {
  MatPaginatorModule,
  MatPaginatorIntl,
} from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { TableService } from './table.service';
import { MatSortModule } from '@angular/material/sort';
import { getSpanishPaginatorIntl } from './spanish-paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { UserStateService } from '../user-state';
@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  providers: [
    TableService,
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
    UserStateService,
  ],
  exports: [TableComponent],
})
export class TableModule {}
