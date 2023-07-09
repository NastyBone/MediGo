import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordComponent } from './record.component';
import { CiteService, DoctorService, PatientService, RecordService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RecordModule } from './record.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

describe('RecordComponent', () => {
  let component: RecordComponent;
  let fixture: ComponentFixture<RecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordComponent],
      providers: [CiteService, RecordService, DoctorService, PatientService, HttpClient, HttpHandler],
      imports: [RecordModule, BrowserAnimationsModule, RouterModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
