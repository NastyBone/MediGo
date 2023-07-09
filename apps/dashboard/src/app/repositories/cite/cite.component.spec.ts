import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiteComponent } from './cite.component';
import { AvailabilityService, CiteService, DoctorService, PatientService, SpecialityService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CiteModule } from './cite.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

describe('CiteComponent', () => {
  let component: CiteComponent;
  let fixture: ComponentFixture<CiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CiteComponent],
      providers: [CiteService, DoctorService, PatientService, AvailabilityService, SpecialityService, HttpClient, HttpHandler],
      imports: [CiteModule, BrowserAnimationsModule, RouterModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
