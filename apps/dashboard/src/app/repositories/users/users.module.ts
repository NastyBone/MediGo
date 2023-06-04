import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TableModule } from '../../common/table/table.module';
import { StateModule } from '../../common/state';
import { FormComponent } from './form/form.component';
import { UsersMemoryService } from './memory';
import {
  CreateUserService,
  DeleteUserService,
  FindUserService,
  GetUsersService,
  UpdateUsersService,
} from './use-cases';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersService } from './users.service';

@NgModule({
  declarations: [UsersComponent, FormComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatCardModule,
    TableModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    StateModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  providers: [
    UsersService,
    CreateUserService,
    UpdateUsersService,
    DeleteUserService,
    GetUsersService,
    FindUserService,
    UsersMemoryService,
  ],
})
export class UsersModule {}
