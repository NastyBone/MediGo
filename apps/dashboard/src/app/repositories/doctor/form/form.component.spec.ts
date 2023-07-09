import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { DoctorService, SpecialityService, UsersService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoctorModule } from '../doctor.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      providers: [DoctorService, SpecialityService, UsersService, HttpHandler, HttpClient,
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      imports: [DoctorModule, BrowserAnimationsModule, RouterModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
