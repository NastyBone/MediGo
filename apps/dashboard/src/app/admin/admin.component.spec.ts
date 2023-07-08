import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { DoctorService, UsersService, PatientService, AssistantService, SpecialityService, AuthService, SettingsService } from '@medigo/dashboard-sdk';
import { AdminService } from './admin.service';
import { AdminModule } from './admin.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterModule } from '@angular/router';
describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminComponent],
      providers: [DoctorService, SpecialityService, UsersService, AuthService, SettingsService, PatientService, AssistantService, AdminService, HttpClient, HttpHandler],
      imports: [AdminModule,
        RouterModule.forRoot([]),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
