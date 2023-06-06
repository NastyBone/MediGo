import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersMemoryService } from '../memory';
import {
  CreateUserService,
  GetUsersService,
  FindUserService,
  DeleteUserService,
  UpdateUsersService,
} from '../use-cases';
import { UsersService } from '../users.service';
import { UsersService as GeneratedUsersService } from '@medigo/dashboard-sdk';
import { FormComponent } from './form.component';
import { MatSelectModule } from '@angular/material/select';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      providers: [
        FormBuilder,
        UsersService,
        CreateUserService,
        GetUsersService,
        UpdateUsersService,
        FindUserService,
        DeleteUserService,
        UsersMemoryService,
        GeneratedUsersService,
        HttpClient,
        HttpHandler,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
      imports: [
        MatDialogModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatCardModule,
        ReactiveFormsModule,
        MatSelectModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
