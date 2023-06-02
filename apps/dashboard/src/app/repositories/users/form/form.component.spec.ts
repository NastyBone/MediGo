import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CreateUserService,
  DeleteUserService,
  FindUserService,
  GetUsersService,
  UpdateUsersService,
} from '../use-cases';
import { UsersService } from '../users.service';

import { FormComponent } from './form.component';
import { UsersService as Service } from '@sm-soc/admin-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { UsersMemoryService } from '../memory';
describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FormComponent],
      providers: [
        Service,
        UsersService,
        UsersMemoryService,
        GetUsersService,
        CreateUserService,
        FindUserService,
        UpdateUsersService,
        DeleteUserService,
        HttpClient,
        HttpHandler,
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
